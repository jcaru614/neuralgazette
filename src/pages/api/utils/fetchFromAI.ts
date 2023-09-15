// import { NextApiRequest, NextApiResponse } from 'next';

const fetchFromAI = async (prompt: string) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': process.env.AI_API_KEY ?? '',
      },
      body: JSON.stringify({
        enable_google_results: false,
        enable_memory: true,
        input_text: prompt,
      }),
    };
    console.log('Working on your AI request sir!', prompt);
    const response = await fetch(
      'https://api.writesonic.com/v2/business/content/chatsonic?engine=premium&language=en',
      options,
    );

    const data = response.json();
    console.log('fetchFromAI', data);
    return data;
  } catch (error) {
    console.error('Error fetching response from AI:', error);
    throw error;
  }
};

export default fetchFromAI;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
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
//     // Extract the photo credit using the defined strategy
//     const response = await fetchFromAI(prompt as string);

//     // Send only the extracted photo credit as the response
//     res.status(200).json({ response });
//   } catch (error) {
//     console.error('Error in API handler:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
