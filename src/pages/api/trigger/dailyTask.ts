import { schedules } from '@trigger.dev/sdk/v3';
import { startUnbiasedArticleGenerationTask } from './startUnbiasedArticleGenerationTask';

async function createUnbiasedArticleSchedule() {
  const createdSchedule = await schedules.create({
    task: startUnbiasedArticleGenerationTask.id,
    cron: '0 0 * * *',
    timezone: 'America/Chicago',
    externalId: 'unbiased_article_generation_123456',
    deduplicationKey: 'unbiased_article_generation_123456_daily',
  });

  console.log('Schedule created:', createdSchedule);
}

createUnbiasedArticleSchedule().catch(console.error);
