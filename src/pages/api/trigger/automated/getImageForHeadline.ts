import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { generateWithPrompt } from '../../utils';
import { extractNamePrompt, imagePrompt } from '@/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

const createImagePrompt = async (headline: string): Promise<string> => {
  try {
    let prompt = await generateWithPrompt(imagePrompt(headline), 1000);

    if (prompt.length > 1000) {
      prompt = `${prompt.substring(0, 997)}...`;
    }

    return (
      prompt ||
      `A professional and high-quality image representing the headline: "${headline}".`
    );
  } catch (error) {
    console.error('Error creating image prompt:', error.message);
    return `A professional and high-quality image representing the headline: "${headline}".`;
  }
};

export const getImageFromHeadlineCore = async (headline: string) => {
  try {
    console.log(
      `[INFO] ${new Date().toISOString()} - getImageForHeadline started`,
    );
    const name = await extractNameFromHeadline(headline);

    if (name) {
      const imageUrl = await getImageFromWikimedia(name);
      if (imageUrl) return imageUrl;
    }

    const imagePrompt = await createImagePrompt(headline);
    const aiImageResponse = await openai.images.generate({
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url',
    });

    return aiImageResponse.data[0]?.url || null;
  } catch (error) {
    console.error('Error in image generation process:', error.message);
    return null;
  }
};

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
        .json({ success: false, error: 'Failed to fetch or generate image.' });
    }
  } catch (error) {
    console.error('Error in getImageForHeadlineHandler:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

export default handler;
