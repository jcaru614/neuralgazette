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

    // Try to update existing contact first
    const existingContact = await prisma.contacts.findUnique({
      where: { email },
    });

    if (existingContact) {
      // If contact exists, update isSubscribed flag to true
      await prisma.contacts.update({
        where: { email },
        data: { isSubscribed: true },
      });

      return res.status(200).json({ 
        success: true,
        message: 'Successfully resubscribed' 
      });
    }

    // If contact doesn't exist, create new one
    await prisma.contacts.create({
      data: {
        email,
        isSubscribed: true,
      },
    });
    
    return res.status(200).json({ 
      success: true,
      message: 'Successfully subscribed' 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
}