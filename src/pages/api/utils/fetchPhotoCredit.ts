// import { NextApiRequest, NextApiResponse } from 'next';
import cheerio from 'cheerio';

export async function extractPhotoCredit(link) {
  // Fetch HTML content from the given link
  const response = await fetch(link as string);

  if (!response.ok) {
    throw new Error('Failed to fetch the content');
  }

  const htmlContent = await response.text();
  const $ = cheerio.load(htmlContent);

  // Define patterns for credit text
  const creditPatterns = [
    /(Photographer|Photograph by|Photographed by)\s(.+?):/i,
    /Image\s(by|credit|courtesy)\s(.+?)(?:,|$)/i,
    /Credit:\s(.+?)(?:,|$)/i,
    /©\s(.+?)\s(?:\d{4})/i, // Example: © John Doe 2023
    /Getty Images/i, // Check for Getty Images
    // Add more patterns as needed based on common formats
  ];

  let photoCredit = '';

  // Loop through patterns to find potential credit elements
  for (const pattern of creditPatterns) {
    const textMatches = $('body').text().match(pattern);

    if (textMatches && textMatches[2]) {
      photoCredit = textMatches[2];
      break; // Break the loop when a credit is found
    }
  }

  if (!photoCredit) {
    // If no credit is found, check for elements with "credit" in class name
    const creditElements = $('[class*=credit]');

    if (creditElements.length > 0) {
      // Extract the text content of the first matching element
      photoCredit = creditElements.first().text().trim();
    }
  }

  if (!photoCredit) {
    // If still no credit is found, look for JSON data within the HTML
    const jsonPattern = /{.*?"caption":"(.*?)".*?}/i;
    const jsonMatches = htmlContent.match(jsonPattern);

    if (jsonMatches && jsonMatches[1]) {
      photoCredit = jsonMatches[1];
    }
  }

  if (!photoCredit) {
    // If no credit is found in any of the checks, provide a default message
    photoCredit = null;
  }

  return photoCredit;
}

export default extractPhotoCredit;
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method !== 'GET') {
//     res.status(405).json({ error: 'Method Not Allowed' });
//     return;
//   }

//   const { link } = req.query;

//   if (!link) {
//     res.status(400).json({ error: 'Missing link query parameter' });
//     return;
//   }

//   try {
//     // Extract the photo credit using the defined strategy
//     const photoCredit = await extractPhotoCredit(link);

//     // Send only the extracted photo credit as the response
//     res.status(200).json({ photoCredit });
//   } catch (error) {
//     console.error('Error in API handler:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
