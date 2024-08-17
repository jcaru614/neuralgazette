import { NextApiRequest, NextApiResponse } from 'next';
import { createUnbiasedNewsArticleCore } from './createUnbiasedNewsArticle';
import InMemoryQueue from './inMemoryQueue';

const articleQueue = new InMemoryQueue();

function generateUniqueTaskId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function saveResult(taskId: string, result: any): void {
  articleQueue.getStatus(taskId).result = result;
}

function notifyCompletion(taskId: string): void {
  console.log(`Task ${taskId} completed.`);
}

export default async function startUnbiasedArticleGeneration(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const taskId = generateUniqueTaskId();

  articleQueue.add(taskId, async () => {
    try {
      const result = await createUnbiasedNewsArticleCore();
      saveResult(taskId, result);
      notifyCompletion(taskId);
    } catch (error) {
      console.error(`Error processing task ${taskId}:`, error);
      saveResult(taskId, { error: error.message });
    }
  });

  res.status(202).json({
    message: 'Article generation started',
    taskId: taskId,
    statusUrl: `/api/checkStatus?taskId=${taskId}`,
  });
}

// API route to check the status of a task
export async function checkStatus(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { taskId } = req.query as { taskId: string };
  const status = articleQueue.getStatus(taskId);

  if (status) {
    res.status(200).json(status);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
}
