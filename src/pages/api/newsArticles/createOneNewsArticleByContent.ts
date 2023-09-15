import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI } from '../utils';
import { headlinePrompt, summaryPrompt, categoryPrompt } from '@/prompts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { title, image, photoCredit, article, originalUrl, originalBias } =
    req.body;

  try {
    console.log("article ", article, "title ", title)
    const unbiasedArticle = article.slice(0, 3000);

    const headline = await fetchFromAI(headlinePrompt(unbiasedArticle));

    const summary = await fetchFromAI(summaryPrompt(unbiasedArticle));

    const category = await fetchFromAI(categoryPrompt(unbiasedArticle));

    console.log(
      `********************************************************
        article: ${unbiasedArticle}
        summary: ${summary.message}
        headline: ${headline.message},
        title ${title.message},
        category: ${category.message},
        ********************************************************
    `,
    );

    await prisma.news.create({
      data: {
        approved: true,
        title: title,
        headline: headline.message,
        summary: summary.message,
        article: article,
        image: image,
        photoCredit: photoCredit,
        category: category.message,
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
