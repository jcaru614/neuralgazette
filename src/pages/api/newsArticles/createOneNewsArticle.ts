import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI } from '../utils';
import {
  unbiasedNewsArticlePrompt,
  titlePrompt,
  headlinePrompt,
  summaryPrompt,
  categoryPrompt,
} from '@/prompts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { article, image, photoCredit, originalUrl, originalBias } = req.body;
  try {
    const unbiasedArticleResponse = await fetchFromAI(
      unbiasedNewsArticlePrompt(article.slice(0, 3000)),
    );

    console.log(`article: ${unbiasedArticleResponse}`);

    const title = await fetchFromAI(
      titlePrompt(unbiasedArticleResponse.message),
    );
    const headline = await fetchFromAI(
      headlinePrompt(unbiasedArticleResponse.message),
    );
    const summary = await fetchFromAI(
      summaryPrompt(unbiasedArticleResponse.message),
    );

    const category = await fetchFromAI(
      categoryPrompt(unbiasedArticleResponse.message),
    );
    console.log(
      `********************************************************
        summary: ${summary.message}
        headline: ${headline.message},
        title ${title.message},
        category: ${category.message},
        ********************************************************
    `,
    );

    await prisma.news.create({
      data: {
        title: title.message,
        headline: headline.message,
        summary: summary.message,
        article: unbiasedArticleResponse.message,
        image: image as string,
        photoCredit: photoCredit,
        category: category.message,
        originalUrl: originalUrl as any,
        originalBias: originalBias as any,
      },
    });

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    console.error('Error creating news posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
