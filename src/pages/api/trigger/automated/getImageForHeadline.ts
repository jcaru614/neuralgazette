import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { generateWithPrompt } from '../../utils';
import { extractNamePrompt, imagePrompt } from '@/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch image URL from Wikimedia
const getImageFromWikimedia = async (query: string): Promise<string | null> => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=500&titles=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query?.pages;

    if (pages) {
      const page: any = Object.values(pages)[0];
      if (page.thumbnail?.source) {
        return page.thumbnail.source;
      }
    }
  } catch (error) {
    console.error('Error fetching from Wikimedia:', error.message);
  }
  return null;
};

// Function to extract name from headline
const extractNameFromHeadline = async (headline: string): Promise<any> => {
  try {
    const extractedName = await generateWithPrompt(
      extractNamePrompt(headline),
      20,
      0.5,
    );
    return extractedName === 'None' ? null : extractedName;
  } catch (error) {
    console.error('Error extracting name from headline:', error.message);
    return null;
  }
};

// Function to generate a detailed prompt from the headline
const createDetailedPrompt = async (headline: string): Promise<string> => {
  try {
    const detailedPrompt = await generateWithPrompt(
      imagePrompt(headline),
      1000,
    );

    if (detailedPrompt.length > 1000) {
      return `${detailedPrompt.substring(0, 997)}...`;
    }

    return (
      detailedPrompt ||
      `Generate an image based on the following headline: "${headline}".`
    );
  } catch (error) {
    console.error('Error creating detailed prompt:', error.message);
    return `Generate an image based on the following headline: "${headline}".`;
  }
};

// Function to generate an image based on the detailed prompt
const generateImageFromPrompt = async (
  detailedPrompt: string,
): Promise<string | null> => {
  try {
    const aiImageResponse = await openai.images.generate({
      prompt: detailedPrompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url',
    });

    return aiImageResponse.data[0]?.url || null;
  } catch (error) {
    console.error('Error generating image from prompt:', error.message);
    return null;
  }
};

// Main function to handle image generation based on headline
export const getImageFromHeadlineCore = async (headline: string) => {
  try {
    console.log(
      `[INFO] ${new Date().toISOString()} - getImageFromHeadlineCore started`,
    );

    // Extract name from the headline
    const name = await extractNameFromHeadline(headline);

    if (name) {
      const imageUrl = await getImageFromWikimedia(name);
      if (imageUrl) return imageUrl;
    }

    // Generate a detailed prompt from the headline
    const detailedPrompt = await createDetailedPrompt(headline);

    // Generate the image based on the detailed prompt
    const imageUrl = await generateImageFromPrompt(detailedPrompt);

    return imageUrl;
  } catch (error) {
    console.error('Error in image generation process:', error.message);
    return null;
  }
};

// API handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { headline } = req.query;

    if (!headline || typeof headline !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing headline query parameter.',
      });
    }

    const imageUrl = await getImageFromHeadlineCore(headline);

    if (imageUrl) {
      res.status(200).json({ success: true, imageUrl });
    } else {
      res
        .status(500)
        .json({ success: false, error: 'Failed to generate image.' });
    }
  } catch (error) {
    console.error('Error in handler:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

export default handler;
