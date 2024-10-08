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
import prisma from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { sanitizeString, generateWithPrompt } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import { slugify } from '@/utils';

const approximateTokens = (text: string): number => {
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
};

const truncateToTokenLimit = (text: string, maxTokens: number): string => {
  const maxChars = maxTokens * 4; // Estimate characters from tokens
  if (text.length > maxChars) {
    return text.slice(0, maxChars);
  }
  return text;
};

const combineArticles = async (
  article1Content: string,
  article2Content: string,
) => {
  const reservedTokensForCompletion = 4000; // Reserve tokens for the completion
  const maxPromptTokens = 8000 - reservedTokensForCompletion; // Max tokens for the prompt

  // Truncate articles based on character count approximation
  article1Content = truncateToTokenLimit(article1Content, maxPromptTokens / 2);
  article2Content = truncateToTokenLimit(article2Content, maxPromptTokens / 2);

  const combinePrompt = combineArticlesPrompt(article1Content, article2Content);
  const promptTokens = approximateTokens(combinePrompt);

  // If promptTokens + reservedTokensForCompletion exceed 8000, adjust further
  if (promptTokens + reservedTokensForCompletion > 8000) {
    const allowedPromptTokens = 8000 - reservedTokensForCompletion;
    const excessTokens = promptTokens - allowedPromptTokens;

    // Adjust by further truncating the articles based on the excess
    article1Content = truncateToTokenLimit(
      article1Content,
      maxPromptTokens / 2 - excessTokens / 2,
    );
    article2Content = truncateToTokenLimit(
      article2Content,
      maxPromptTokens / 2 - excessTokens / 2,
    );
  }

  const combinedArticle = await generateWithPrompt(
    combinePrompt,
    reservedTokensForCompletion,
  );
  return combinedArticle;
};
// Core function that can be reused
export const createUnbiasedNewsArticleCore = async () => {
  console.log(
    `[INFO] ${new Date().toISOString()} - createUnbiasedArticle started`,
  );
  const similarStories = await findSimilarStoriesCore();

  if (!similarStories || similarStories.length < 1) {
    throw new Error('No similar stories found.');
  }

  const article1Content = sanitizeString(similarStories[0].rightNews.content);
  const article2Content = sanitizeString(similarStories[0].leftNews.content);

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

  const imageUrl = await getImageFromHeadlineCore(sanitizedHeadline);
  // const imageUrl =
  //   'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/500px-Kamala_Harris_Vice_Presidential_Portrait.jpg';

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
  console.log(
    `[INFO] ${new Date().toISOString()} - createUnbiasedArticle Completed`,
  );
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
