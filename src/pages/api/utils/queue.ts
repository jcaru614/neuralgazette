interface QueueData {
  url: string;
  originalBias: string;
}

const inMemoryQueue: QueueData[] = [];

const publishToQueue = async (data: QueueData) => {
  inMemoryQueue.push(data);
};

const consumeFromQueue = (
  processFunction: (data: QueueData) => Promise<void>,
) => {
  const processQueue = async () => {
    while (inMemoryQueue.length > 0) {
      const data = inMemoryQueue.shift();
      if (data) {
        await processFunction(data);
      }
    }
    // Poll the queue periodically
    setTimeout(processQueue, 1000);
  };

  processQueue();
};

export { publishToQueue, consumeFromQueue };
