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

// Create a BullMQ queue for article generation jobs
const articleQueue = new Queue('articleQueue', { connection });

// This will hold a map of job statuses
const jobStatuses = new Map<string, string>();

export async function GET(request: Request) {
  const jobId = `job-${Date.now()}`; // Unique job ID

  // Set headers for streaming
  const headers = new Headers({
    'Content-Type': 'text/plain; charset=utf-8',
    'Transfer-Encoding': 'chunked',
  });

  // Create a ReadableStream to stream data
  const stream = new ReadableStream({
    start(controller) {
      // Add a job to the queue
      articleQueue
        .add('generateArticle', { jobId }, { jobId })
        .then(() => {
          controller.enqueue('Job started. Processing...\n');

          // Create a new worker to process jobs in the queue
          const worker = new Worker(
            'articleQueue',
            async (job: Job) => {
              try {
                const result = await createUnbiasedNewsArticleCore();
                jobStatuses.set(job.id, 'completed');
                return result;
              } catch (error) {
                jobStatuses.set(job.id, `failed: ${error.message}`);
                throw new Error(`Error in job processing: ${error.message}`);
              }
            },
            { connection },
          );

          worker.on('completed', (job: Job, result: any) => {
            console.log(`Job ${job.id} has completed! Result:`, result);
            controller.enqueue('Job completed. Result: ' + result + '\n');
            // Optionally, you can send result to a database or perform additional actions here
          });

          worker.on('failed', (job: Job, err: Error) => {
            console.error(`Job ${job.id} failed with error:`, err);
            controller.enqueue('Job failed with error: ' + err.message + '\n');
          });

          // Keep the function alive with periodic pings
          const keepAliveInterval = setInterval(() => {
            controller.enqueue('ping\n'); // Write a small chunk to keep the process alive
          }, 5000); // Send a ping every 5 seconds

          // Clear the keep-alive interval when the response ends or the client disconnects
          request.signal.addEventListener('abort', () => {
            clearInterval(keepAliveInterval);
          });
        })
        .catch((error) => {
          controller.enqueue(`Failed to start job: ${error.message}\n`);
          controller.close(); // Close the stream if job addition fails
        });
    },
  });

  return new Response(stream, { headers });
}
