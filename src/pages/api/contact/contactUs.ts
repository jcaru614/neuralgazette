import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PW,
        },
      });

      const { from, subject, text } = req.body;

      const mailOptions = {
        from: from,
        to: process.env.NODEMAILER_EMAIL,
        subject,
        text: `${text}\n\nSent from email address: ${from}`,
        html: `${text}<br><br><a href="mailto:${from}?subject=RE: ${subject}">Reply to User</a>`,
      };
      
      
      
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.status(405).end();
  }
}
