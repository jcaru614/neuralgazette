import { task, logger, wait } from '@trigger.dev/sdk/v3';
import { startUnbiasedArticleGeneration } from './automated/startUnbiasedArticleGeneration';
import { createUnbiasedNewsArticleCore } from './automated/createUnbiasedNewsArticle';
import { findSimilarStoriesCore } from './automated/findSimilarStories';

export const startUnbiasedArticleGenerationTask = task({
  id: 'start-unbiased-article-generation',
  run: async (payload: any, { ctx }) => {
    logger.log('Starting unbiased news article generation', { payload, ctx });

    try {
      // const result = await startUnbiasedArticleGeneration();
      // const result = await findSimilarStoriesCore();
      const result = await createUnbiasedNewsArticleCore();

      return {
        message: 'Unbiased news article generation started successfully 123',
        result,
      };
    } catch (error) {
      logger.error('Failed to start unbiased news article generation', {
        error,
      });
      return {
        message: 'Failed to start unbiased news article generation',
        error: error.message,
      };
    }
  },
});
