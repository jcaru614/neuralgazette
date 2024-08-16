type TaskStatus = 'pending' | 'completed' | 'error';

interface TaskStatusRecord {
  status: TaskStatus;
  result?: any;
  error?: string;
}

class InMemoryQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing: boolean = false;
  private taskStatus: Record<string, TaskStatusRecord> = {};

  public add(taskId: string, task: () => Promise<void>): void {
    this.taskStatus[taskId] = { status: 'pending' };
    this.queue.push(async () => {
      try {
        await task();
        this.taskStatus[taskId] = { status: 'completed' };
      } catch (error) {
        this.taskStatus[taskId] = { status: 'error', error: error.message };
      }
    });
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }

    this.isProcessing = false;
  }

  public getStatus(taskId: string): TaskStatusRecord | undefined {
    return this.taskStatus[taskId];
  }
}

export default InMemoryQueue;
