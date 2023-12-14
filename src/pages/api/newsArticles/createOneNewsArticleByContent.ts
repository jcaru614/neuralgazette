import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { fetchFromAI } from '../utils';
import { categoryPrompt, headlinePrompt, summaryPrompt } from '@/prompts';
import fs from 'fs';
import { slugify } from '@/utils';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const form = new multiparty.Form();

  try {
    const { fields, files }: any = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          // Transform fields to extract the first index
          const transformedFields = Object.fromEntries(
            Object.entries(fields).map(([key, value]) => [
              key,
              value && value[0],
            ]),
          );
          resolve({ fields: transformedFields, files });
        }
      });
    });

    const { title, photoCredit, article, originalUrl, originalBias } = fields;
    const uploadedImage = files.image[0]; // multiparty puts files in an array
    console.log('files', files);

    const unbiasedArticle = article.slice(0, 3000);

    const headline = await fetchFromAI(headlinePrompt(unbiasedArticle));
    const summary = await fetchFromAI(summaryPrompt(unbiasedArticle));
    const category = await fetchFromAI(categoryPrompt(unbiasedArticle));
    console.log('category!!!!!!!!!!!!!!!!! ', category);
    const fileExtension = uploadedImage.originalFilename
      .split('.')
      .pop()
      .toLowerCase();

    const image = await fs.promises.readFile(uploadedImage.path);

    const { data: photoData, error: photoError } = await supabase.storage
      .from('images')
      .upload(`photos/${slugify(title)}`, image, {
        contentType: `image/${fileExtension}`,
      });
    if (photoError) {
      console.error('Error uploading photo:', photoError.message);
      res.status(500).json({ error: 'Error uploading photo' });
      return;
    } else {
      console.log('photodata', photoData);
    }

    await prisma.news.create({
      data: {
        approved: false,
        title: title,
        headline: headline.message,
        summary: summary.message,
        article: article,
        // image: photoData, // Store uploaded image URL
        photoCredit: photoCredit,
        category: category,
        originalUrl: originalUrl,
        originalBias: originalBias as any,
      },
    });

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    console.error('Error creating news posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
