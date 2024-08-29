import { NextApiRequest, NextApiResponse } from 'next';
import { findSimilarStoriesCore } from './findSimilarStories';
import { getImageFromHeadlineCore } from './getImageForHeadline';
import {
  titlePrompt,
  headlinePrompt,
  summaryPrompt,
  combineArticlesPrompt,
  categoryPrompt,
} from '@/prompts';
import OpenAI from 'openai';
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { sanitizeString } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { slugify } from '@/utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateWithPrompt = async (prompt: string, maxTokens: number) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: maxTokens,
    temperature: 0.7,
  });
  return response.choices[0].message.content.trim();
};

const combineArticles = async (
  article1Content: string,
  article2Content: string,
) => {
  const combinePrompt = combineArticlesPrompt(article1Content, article2Content);
  const combinedArticle = await generateWithPrompt(combinePrompt, 4000);
  return combinedArticle;
};

// Core function that can be reused
export const createUnbiasedNewsArticleCore = async () => {
  const similarStories = await findSimilarStoriesCore();

  if (!similarStories || similarStories.length < 1) {
    throw new Error('No similar stories found.');
  }

  const article1Content = sanitizeString(similarStories[0].foxnews.content);
  const article2Content = sanitizeString(similarStories[0].msnbc.content);

  let combinedContent = await combineArticles(article1Content, article2Content);

  const [title, headline, summary, category] = await Promise.all([
    generateWithPrompt(titlePrompt(combinedContent), 30),
    generateWithPrompt(headlinePrompt(combinedContent), 38),
    generateWithPrompt(summaryPrompt(combinedContent), 113),
    generateWithPrompt(categoryPrompt(combinedContent), 10),
  ]);

  const sanitizedTitle = sanitizeString(title);
  const sanitizedHeadline = sanitizeString(headline);
  const sanitizedSummary = sanitizeString(summary);

  // this branch works
  // const imageUrl = await getImageFromHeadlineCore(sanitizedHeadline);
  const imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/500px-Kamala_Harris_Vice_Presidential_Portrait.jpg';

  if (!imageUrl) {
    throw new Error('Failed to generate or fetch image');
  }

  const response = await fetch(imageUrl);
  const contentType = response.headers.get('Content-Type') || 'image/jpeg';
  const buffer = await response.arrayBuffer();

  const uuid = uuidv4();
  const slugWithUuid = `${slugify(sanitizedTitle)}-${uuid}`;

  const { error: photoError } = await supabase.storage
    .from('photos')
    .upload(slugWithUuid, buffer, {
      contentType,
    });

  if (photoError) {
    throw new Error('Error uploading photo: ' + photoError.message);
  }

  await prisma.news.create({
    data: {
      approved: true,
      title: sanitizedTitle,
      headline: sanitizedHeadline,
      summary: sanitizedSummary,
      article: combinedContent,
      photoPath: slugWithUuid,
      category: category as any,
    },
  });

  return { message: 'Article created successfully' };
};

// API handler that uses the core function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await createUnbiasedNewsArticleCore();
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error generating article:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default handler;
