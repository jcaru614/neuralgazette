import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PUT') {
      res.status(405).end();
      return;
    }
    
    const news = await prisma.news.findMany({
      where: {
        approved: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });

    await prisma.news.updateMany({
      where: {
        id: {
          in: news.map((article) => article.id),
        },
      },
      data: {
        approved: true,
      },
    });

    res.status(200).json({ message: 'Approved articles successfully' });
  } catch (error) {
    console.error('Error approving articles:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while approving articles' });
  }
}
