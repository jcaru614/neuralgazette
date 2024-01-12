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
    const news = await prisma.news.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching the latest news:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the latest news' });
  }
}
