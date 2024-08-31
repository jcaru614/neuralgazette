// import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateWithPrompt = async (
  prompt: string,
  maxTokens: number,
  temp?: number,
) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: temp ? temp : 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching response from AI:', error);
    throw error;
  }
};
export default generateWithPrompt;
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'GET') {
//     res.status(405).json({ error: 'Method Not Allowed' });
//     return;
//   }

//   const { prompt } = req.query;

//   if (!prompt) {
//     res.status(400).json({ error: 'Missing prompt parameter' });
//     return;
//   }

//   try {
//     const response = await generateWithPrompt(prompt, 20);
//     res.status(200).json({ response });
//   } catch (error) {
//     console.error('Error in API handler:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export default handler;
