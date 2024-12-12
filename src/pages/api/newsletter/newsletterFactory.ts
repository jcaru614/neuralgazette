import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

// Configure Brevo
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const contacts = await prisma.contacts.findMany({
      where: {
        isSubscribed: true  // Only get subscribed contacts
      },
      select: {
        email: true,
        name: true,
      },
    });

    const BATCH_SIZE = 50;
    const results = [];

    for (let i = 0; i < contacts.length; i += BATCH_SIZE) {
      const batch = contacts.slice(i, i + BATCH_SIZE);

      // Send individual emails to each contact in the batch
      for (const contact of batch) {
        const token = sign({ email: contact.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/unsubscribe?token=${token}`;

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        
        sendSmtpEmail.to = [{
          email: contact.email,
          name: contact.name || undefined,
        }];

        sendSmtpEmail.sender = {
          email: 'neuralgazette@gmail.com',
          name: 'Your Name',
        };

        sendSmtpEmail.subject = 'Your Newsletter Subject';
        sendSmtpEmail.htmlContent = `
          <html>
            <body>
              <h1>Hello ${contact.name || 'there'}!</h1>
              <p>Your newsletter content here</p>
              <p style="margin-top: 20px; font-size: 12px;">
                To unsubscribe from our newsletter, 
                <a href="${unsubscribeUrl}">click here</a>
              </p>
            </body>
          </html>
        `;

        try {
          const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
          results.push(result);
        } catch (error) {
          console.error(`Failed to send email to ${contact.email}:`, error);
        }
      }

      // Add delay between batches
      if (i + BATCH_SIZE < contacts.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return res.status(200).json({
      success: true,
      totalSent: results.length,
      contacts: contacts.length,
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}