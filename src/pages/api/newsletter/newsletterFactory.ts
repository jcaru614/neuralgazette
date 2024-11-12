import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import SibApiV3Sdk from 'sib-api-v3-sdk';

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
    // Get all contacts from database
    const contacts = await prisma.contacts.findMany({
      select: {
        email: true,
        name: true,
      },
    });

    // Send emails in batches
    const BATCH_SIZE = 50;
    const results = [];

    for (let i = 0; i < contacts.length; i += BATCH_SIZE) {
      const batch = contacts.slice(i, i + BATCH_SIZE);

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      // Configure email for batch
      sendSmtpEmail.to = batch.map((contact) => ({
        email: contact.email,
        name: contact.name || undefined,
      }));

      sendSmtpEmail.sender = {
        email: 'neuralgazette@gmail.com',
        name: 'Your Name',
      };

      sendSmtpEmail.subject = 'Your Newsletter Subject';
      sendSmtpEmail.htmlContent = `
        <html>
          <body>
            <h1>Hello!</h1>
            <p>Your newsletter content here</p>
          </body>
        </html>
      `;

      try {
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        results.push(result);

        // Add delay between batches
        if (i + BATCH_SIZE < contacts.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Failed to send batch ${i / BATCH_SIZE + 1}:`, error);
      }
    }

    return res.status(200).json({
      success: true,
      totalSent: results.length * BATCH_SIZE,
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
