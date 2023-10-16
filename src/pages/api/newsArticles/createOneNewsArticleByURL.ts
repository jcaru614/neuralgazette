import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI, extractNews, extractPhotoCredit } from '../utils';
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
  const { url, originalBias } = req.body;

  try {
    const news = await extractNews(url);
    console.log('news.slice', news.text.slice(0, 3000));

    const unbiasedArticleResponse = await fetchFromAI(
      unbiasedNewsArticlePrompt(news.text.slice(0, 3000)),
    );

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

    const photoCredit = await extractPhotoCredit(news.url);

    console.log(
      `********************************************************
        article: ${unbiasedArticleResponse.message}
        summary: ${summary.message}
        headline: ${headline.message},
        title ${title.message},
        category: ${category.message},
        ********************************************************
    `,
    );

    await prisma.news.create({
      data: {
        approved: false,
        title: title.message,
        headline: headline.message,
        summary: summary.message,
        article: unbiasedArticleResponse.message,
        image: news.image as string,
        photoCredit: photoCredit,
        category: category.message,
        originalUrl: news.url as any,
        originalBias: originalBias as any,
      },
    });

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    console.error('Error creating news posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

