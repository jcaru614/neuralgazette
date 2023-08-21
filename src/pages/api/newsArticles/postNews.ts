import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI, fetchExternalNews } from '../utils';
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
  const { news_sources, text, earliest_publish_date, originalBias } = req.query;
  try {
    const { news } = await fetchExternalNews(
      news_sources as string,
      text as string,
      earliest_publish_date as any,
    );

    console.log(
      `********************************************************
      unbiasedNewsArticlePrompt: ${unbiasedNewsArticlePrompt(
        news[0].text.slice(0, 3000),
      )}
      ********************************************************
  `,
    );
    const promises = news.map(async (newsItem: any) => {
      const unbiasedArticleResponse = await fetchFromAI(
        unbiasedNewsArticlePrompt(newsItem.text.slice(0, 3000)),
      );

      console.log(
        `********************************************************
        article: ${unbiasedArticleResponse}
        ********************************************************
    `,
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
          image: newsItem.image,
          category: category.message,
          originalUrl: newsItem.url,
          originalBias: originalBias as any,
        },
      });
    });
    await Promise.all(promises);

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
