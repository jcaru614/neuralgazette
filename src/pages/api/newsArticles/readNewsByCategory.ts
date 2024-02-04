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

    const { category, take }: any = req.query;

    const news = await prisma.news.findMany({
      where: {
        approved: true,
        category: {
          equals: category.toUpperCase(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: take ? parseInt(take, 10) : undefined,
    });

    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({ error: 'An error occurred while fetching news' });
  }
}
