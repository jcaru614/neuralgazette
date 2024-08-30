import { schedules } from '@trigger.dev/sdk/v3';

export const scheduledTask = schedules.task({
  id: 'start-unbiased-article-generation',
  // 10 AM Central Time (America/Chicago)
  cron: {
    pattern: '0 10 * * *',
    timezone: 'America/Chicago',
  },
  run: async (payload) => {
    // Your task logic here
    console.log('Running scheduled task with payload:', payload);
  },
});
