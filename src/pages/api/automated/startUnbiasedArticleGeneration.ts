import { NextApiRequest, NextApiResponse } from 'next';
import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { createUnbiasedNewsArticleCore } from './createUnbiasedNewsArticle';

const port = Number(process.env.REDIS_PORT) || 6379;
const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: port,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

const articleQueue = new Queue('articleQueue', {
  connection,
});

// Create a worker to process jobs in the queue
const worker = new Worker(
  'articleQueue',
  async (job: Job) => {
    try {
      console.log(`Processing job ${job.id}`);
      const result = await createUnbiasedNewsArticleCore();
      console.log(`Finished processing job ${job.id}`);
      return result;
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
      throw error;
    }
  },
  { connection },
);

worker.on('completed', (job: Job, result: any) => {
  console.log(`Job ${job.id} has completed! Result:`, result);
});

worker.on('failed', (job: Job, err: Error) => {
  console.error(`Job ${job.id} failed with error:`, err);
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Always run dynamically

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(202).json({ message: 'Article generation started' });
  const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    start(controller) {
      articleQueue
        .add('generateArticle', {})
        .then((job) => {
          const checkJobStatus = async () => {
            const jobResult = await articleQueue.getJob(job.id);
            if (!jobResult) {
              controller.enqueue(encoder.encode(`Job ${job.id} not found.\n`));
              controller.close();
              return;
            }

            const state = await jobResult.getState();
            controller.enqueue(
              encoder.encode(`Job ${job.id} is currently ${state}\n`),
            );

            if (state === 'completed') {
              const result = jobResult.returnvalue;
              controller.enqueue(
                encoder.encode(
                  `Job ${job.id} has completed! Result: ${JSON.stringify(result)}\n`,
                ),
              );
              controller.close();
            } else if (state === 'failed') {
              const failedReason = jobResult.failedReason;
              controller.enqueue(
                encoder.encode(
                  `Job ${job.id} failed with error: ${failedReason}\n`,
                ),
              );
              controller.close();
            } else {
              setTimeout(checkJobStatus, 5000); // Poll every 5 seconds
            }
          };

          checkJobStatus();
        })
        .catch((error) => {
          controller.enqueue(
            encoder.encode(
              `Failed to start article generation: ${error.message}\n`,
            ),
          );
          controller.close();
        });
    },
  });

  return new Response(customReadable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
