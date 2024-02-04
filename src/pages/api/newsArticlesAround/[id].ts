import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const { id } = req.query;

  try {
    const currentArticle = await prisma.news.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!currentArticle) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    const beforeArticles = await prisma.news.findMany({
      where: {
        createdAt: {
          lt: currentArticle.createdAt,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
    });

    const afterArticles = await prisma.news.findMany({
      where: {
        createdAt: {
          gt: currentArticle.createdAt,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 1,
    });
    res.status(200).json({
      currentArticle,
      beforeArticles,
      afterArticles,
    });
  } catch (error) {
    console.error('Error retrieving news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
