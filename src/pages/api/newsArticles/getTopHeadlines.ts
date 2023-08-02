import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import Bard, { askAI } from 'bard-ai';

const askBard = async (prompt: any) => {
  await Bard.init(`${process.env.GOOGLE_BARD_KEY}`);
  console.log(prompt);
  let response = await askAI(prompt);
  return response;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const responseLeft = await fetch(
      `https://newsapi.org/v2/everything?sources=msnbc&pageSize=50&apiKey=${process.env.NEWS_API_KEY}`,
    );

    const responseRight = await fetch(
      `https://newsapi.org/v2/everything?sources=fox-news&pageSize=50&apiKey=${process.env.NEWS_API_KEY}`,
    );

    const dataLeft = await responseLeft.json();
    const dataRight = await responseRight.json();

    const prompt = `Find one article title from MSNBC and one article title from Fox News that are about the same political story. Then write an unbiased headline and summary based on the information you learned from both articles. Please only include **headline** and **summary** and nothing else in your response to the prompt.`;
    // const prompt = `
    //   "question": "find one matching article title from MSNBC and one matching article title from Fox News based on the many articles that I have provided below. Then write an unbiased headline and unbiased summary based on the information you learned from both articles."

    //   "msnbcTitles": "${dataLeft.articles
    //     .map((article: any) => article.title)
    //     .join(', ')}",

    //   "foxNewsTitles": "${dataRight.articles
    //     .map((article: any) => article.title)
    //     .join(', ')}"
    // `;

    const response = (await askBard(prompt)) as any;
    console.log('response ', response);
    // res.status(200).json(response);
    const post = await prisma.news.create({
      data: {
        headline: `article title ${Math.floor(Math.random() * (1 - 1000)) + 1}`,
        summary: response,
      },
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
