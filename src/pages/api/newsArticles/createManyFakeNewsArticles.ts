import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  try {
    const combinedNews = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const promises = combinedNews.map(async (newsItem: any) => {
    
      await prisma.news.create({
        data: {
          approved: true,
          title: "title.message",
          headline: "headline.message",
          summary: "summary.message",
          article: "unbiasedArticleResponse.message",
          image: 'https://img.freepik.com/fotos-premium/irpin-ukraine-09-maerz-2022-krieg-in-der-ukraine-tausende-einwohner-von-irpin-muessen-ihre-haeuser-verlassen-und-evakuieren-da-russische-truppen-eine-friedliche-stadt-bombardieren-kriegsfluechtlinge-in-der-ukraine_173948-7621.jpg',
          photoCredit: "newsItem.photoCredit",
          category: 'POLITICS',
          originalUrl: "newsItem.url",
          originalBias: "LEFT",
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
