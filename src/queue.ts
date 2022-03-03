import Queue from "bull";

const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;

export interface SumQueueParams {
  a: number;
  b: number;
  failed?: boolean;
}

// type SumQueueJob = Queue.Job<SumQueueParams>;

export interface StartQueue {
  sumQueue: Queue.Queue<SumQueueParams>;
}

export async function startQueue(): Promise<StartQueue> {
  const sumQueue = new Queue<SumQueueParams>(
    "sumQueue",
    `redis://${REDIS_HOST}:${REDIS_PORT}`
  );

  // warning: do not await, wait indefinitely, queue.process
  sumQueue.process(async (job, done): Promise<void> => {
    try {
      if (typeof job.data.failed === "boolean") {
        // example exception
        const value = "{";
        JSON.parse(value);
      }
      const result = job.data.a + job.data.b;
      // job.id contains id of this job.
      // console.log(`sum Job with id ${job.id} result:`, result);
      // done(result) // error
      done(null, { done: result });
    } catch (e) {
      // handled exception
      done(e as Error, {});
    }
  });

  sumQueue.on("completed", (job, result): void => {
    // console.log(job.data)
    console.log(`app sum Job with id ${job.id} has been completed`);
    console.log(result);
  });

  sumQueue.on("failed", (job, error): void => {
    // console.log(job.data)
    console.log(`app sum Job with id ${job.id} has been failed`);
    console.log(error);
  });

  return {
    sumQueue,
  };
}
