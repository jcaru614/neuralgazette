import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  try {
    const result = await prisma.news.findUnique({
      where: {
        id: String(id),
      },
    });


    res.status(200).json(result);
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
