import { logger, schedules } from '@trigger.dev/sdk/v3';
import { createUnbiasedNewsArticleCore } from './automated/createUnbiasedNewsArticle';
// import { findSimilarStoriesCore } from './automated/findSimilarStories';

export const startUnbiasedArticleGenerationTask = schedules.task({
  id: 'start-unbiased-article-generation',
  run: async (payload: any, { ctx }) => {
    logger.log('Starting unbiased news article generation', { payload, ctx });

    try {
      // const result = await findSimilarStoriesCore();
      const result = await createUnbiasedNewsArticleCore();
      // const result = 'testing article schedule';
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
