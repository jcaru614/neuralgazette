import { NextApiRequest, NextApiResponse } from 'next';
import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { createUnbiasedNewsArticleCore } from './createUnbiasedNewsArticle';

console.log('REDIS_PORT:', process.env.REDIS_PORT);
const port = Number(process.env.REDIS_PORT) || 6379;
console.log('Parsed Port:', port);

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: port,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, // Required by BullMQ to handle retries properly
});

// Create a BullMQ queue for article generation jobs
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
      return result; // The result is returned and stored with the job
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
      throw error; // Rethrow to mark the job as failed
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

export async function startUnbiasedArticleGeneration(): Promise<{
  message: string;
  jobId?: string;
  error?: string;
}> {
  try {
    const job = await articleQueue.add('generateArticle', {});
    return { message: 'Article generation started', jobId: job.id };
  } catch (error) {
    return {
      message: 'Failed to start article generation',
      error: error.message,
    };
  }
}

// API route to check the status of a job
export async function checkJobStatus(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { jobId } = req.query as { jobId: string };

  try {
    const job = await articleQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const state = await job.getState(); // returns 'completed', 'failed', 'waiting', 'active', etc.
    const result = job.returnvalue; // result of the job if completed
    const failedReason = job.failedReason; // error message if the job failed

    res.status(200).json({ state, result, failedReason });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to check job status', error: error.message });
  }
}
