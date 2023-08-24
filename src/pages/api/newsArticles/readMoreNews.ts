import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { lastNewsId }: any = req.query;
    const news = await prisma.news.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: lastNewsId ? 1 : 0,
      ...(lastNewsId ? { cursor: { id: lastNewsId } } : {}),
      take: 5,
    });
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching more news:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
