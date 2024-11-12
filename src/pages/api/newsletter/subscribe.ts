import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body
    console.log(email);
    await prisma.contacts.create({
      data: {
        email,
      },
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Successfully subscribed' 
    })

  } catch (error) {
    console.error('Subscription error:', error)
    if (error.code === 'P2002') {
      return res.status(409).json(
        { error: 'You are already subscribed!' }
      );
    }
    
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
}