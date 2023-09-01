import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI, fetchExternalNews, extractPhotoCredit } from '../utils';
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
  const {
    leftNewsSources,
    rightNewsSources,
    text,
    earliestPublishDate,
  } = req.body;
  try {
    const leftNews = await fetchExternalNews(
      leftNewsSources as string,
      text as string,
      earliestPublishDate as any,
    );
    const rightNews = await fetchExternalNews(
      rightNewsSources as string,
      text as string,
      earliestPublishDate as any,
    );

    console.log('Left News Sources:', leftNews.news);
    console.log('Right News Sources:', rightNews.news);

    const combinedNews = [];
    const maxNewsCount = Math.max(leftNews.news.length, rightNews.news.length);

    for (let i = 0; i < maxNewsCount; i++) {
      if (i < leftNews.news.length) {
        const leftNewsItem = leftNews.news[i];
        const photoCredit = await extractPhotoCredit(leftNewsItem.url); // Extract photo credit
        combinedNews.push({ ...leftNewsItem, originalBias: 'LEFT', photoCredit });
      }
      if (i < rightNews.news.length) {
        const rightNewsItem = rightNews.news[i];
        const photoCredit = await extractPhotoCredit(rightNewsItem.url); // Extract photo credit
        combinedNews.push({ ...rightNewsItem, originalBias: 'RIGHT', photoCredit });
      }
    }

    console.log('combinedNews News Sources:', combinedNews);
    console.log(
      `unbiasedNewsArticlePrompt: ${unbiasedNewsArticlePrompt(
        combinedNews[0].text.slice(0, 3000),
      )}`,
    );

    const promises = combinedNews.map(async (newsItem: any) => {
      const unbiasedArticleResponse = await fetchFromAI(
        unbiasedNewsArticlePrompt(newsItem.text.slice(0, 3000)),
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
          image: newsItem.image,
          photoCredit: newsItem.photoCredit,
          category: category.message,
          originalUrl: newsItem.url,
          originalBias: newsItem.originalBias,
        },
      });
    });
    await Promise.all(promises);

    res.status(201).json({ message: 'Posts created successfully' });
  } catch (error) {
    console.error('Error creating news posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
