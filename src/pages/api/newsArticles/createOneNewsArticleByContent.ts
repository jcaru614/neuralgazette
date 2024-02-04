import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { fetchFromAI, sanitizeString } from '../utils';
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
          for (const key in fields) {
            if (fields[key] && fields[key][0]) {
              fields[key] = fields[key][0];
            }
          }

          fields.outboundLinks = fields.outboundLinks
            ? fields.outboundLinks.split(',').map((link) => link.trim())
            : [];

          resolve({ fields, files });
        }
      });
    });
    console.log('fields and files', fields, files);
    const { title, photoCredit, article, outboundLinks } = fields;

    const unbiasedArticle = article.slice(0, 3000);

    const [headline, summary, category] = await Promise.all([
      fetchFromAI(headlinePrompt(unbiasedArticle)),
      fetchFromAI(summaryPrompt(unbiasedArticle)),
      fetchFromAI(categoryPrompt(unbiasedArticle)),
    ]);

    let slugWithUuid;

    if (files && files.photo) {
      const uploadedPhoto = files.photo[0];
      const fileExtension = uploadedPhoto.originalFilename
        .split('.')
        .pop()
        .toLowerCase();

      const photo = await fs.readFile(uploadedPhoto.path);

      const uuid = uuidv4();

      slugWithUuid = `${slugify(title)}-${uuid}`;

      const { error: photoError } = await supabase.storage
        .from('photos')
        .upload(slugWithUuid, photo, {
          contentType: `image/${fileExtension}`,
        });

      if (photoError) {
        res.status(500).json({ error: 'Error uploading photo' });
        return;
      }
    }

    const sanitizedHeadline = sanitizeString(headline.message);
    const sanitizedSummary = sanitizeString(summary.message);
    
    await prisma.news.create({
      data: {
        approved: true,
        title,
        headline: sanitizedHeadline,
        summary: sanitizedSummary,
        article,
        photoPath: files && files.photo ? slugWithUuid : null,
        photoCredit,
        outboundLinks: outboundLinks || [],
        category: category.message,
      },
    });

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
