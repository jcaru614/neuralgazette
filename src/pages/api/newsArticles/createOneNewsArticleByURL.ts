import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI, extractNews, extractPhotoCredit, publishToQueue, consumeFromQueue } from '../utils';
import {
  unbiasedNewsArticlePrompt,
  titlePrompt,
  headlinePrompt,
  summaryPrompt,
  categoryPrompt,
} from '@/prompts';

interface RequestBody {
  url: string;
  originalBias: string;
}

const processQueueMessage = async ({ url, originalBias }: RequestBody) => {
  const news = await extractNews(url);

  const unbiasedArticleResponse = await fetchFromAI(
    unbiasedNewsArticlePrompt(news.text.slice(0, 3000)),
  );

  const title = await fetchFromAI(titlePrompt(unbiasedArticleResponse.message));
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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const { url, originalBias }: RequestBody = req.body;
    // Publish the URL to the queue for asynchronous processing
    await publishToQueue({ url, originalBias });

    res.status(200).json({ message: 'Processing started' });
  } catch (error) {
    console.error('Error starting processing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Start listening to the queue for messages
consumeFromQueue(processQueueMessage);