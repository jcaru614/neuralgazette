import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') {
      res.status(405).end();
      return;
    }

    const { q }: any = req.query;

    if (!q) {
      res.status(400).json({ error: 'Search query parameter (q) is required' });
      return;
    }

    const news = await prisma.news.findMany({
      where: {
        approved: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { headline: { contains: q, mode: 'insensitive' } },
          { summary: { contains: q, mode: 'insensitive' } },
          { article: { contains: q, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });


    const takeCount = Math.min(news.length, 5); 
    const limitedNews = news.slice(0, takeCount);

    res.status(200).json(limitedNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'An error occurred while fetching news' });
  }
}
