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
    const { lastNewsId, category }: any = req.query;
    const news = await prisma.news.findMany({
      where: {
        approved: true,
        category: {
          equals: category,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: lastNewsId ? 1 : 0,
      ...(lastNewsId ? { cursor: { id: lastNewsId } } : {}),
      take: 10,
    });

    res.status(200).json(news);
  } catch (error) {
    console.error(
      'Error fetching more news by category and lastNewsId:',
      error,
    );
    res
      .status(500)
      .json({
        error: 'An error occurred while fetching more news by category',
      });
  }
}
