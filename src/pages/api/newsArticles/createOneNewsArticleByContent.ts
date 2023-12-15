import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { fetchFromAI } from '../utils';
import { categoryPrompt, headlinePrompt, summaryPrompt } from '@/prompts';
import { slugify } from '@/utils';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

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

    const unbiasedArticle = article.slice(0, 3000);

    const [headline, summary, category] = await Promise.all([
      fetchFromAI(headlinePrompt(unbiasedArticle)),
      fetchFromAI(summaryPrompt(unbiasedArticle)),
      fetchFromAI(categoryPrompt(unbiasedArticle)),
    ]);
    let slugWithUuid;
    console.log('files *** 1');
    if (files && files.photo) {
      const uploadedPhoto = files.photo[0];
      console.log('files *** 2', files, 'uploadedImage', uploadedPhoto);
      const fileExtension = uploadedPhoto.originalFilename
        .split('.')
        .pop()
        .toLowerCase();

      const photo = await fs.readFile(uploadedPhoto.path);

      const uuid = uuidv4();

      slugWithUuid = `${slugify(title)}-${uuid}`;

      const { data: photoData, error: photoError } = await supabase.storage
        .from('photos')
        .upload(slugWithUuid, photo, {
          contentType: `image/${fileExtension}`,
        });

      if (photoError) {
        console.error('Error uploading photo:', photoError.message);
        res.status(500).json({ error: 'Error uploading photo' });
        return;
      } else {
        console.log('photodata', photoData);
      }
    }

    await prisma.news.create({
      data: {
        approved: true,
        title,
        headline: headline.message,
        summary: summary.message,
        article,
        photoPath: files && files.photo ? slugWithUuid : null,
        photoCredit,
        category: category.message,
        originalUrl,
        originalBias: originalBias as any,
      },
    });

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    console.error('Error creating news posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
