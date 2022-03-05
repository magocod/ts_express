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

const cronConfig = {
  cron: "* * * * * *",
};

export async function startQueue(): Promise<StartQueue> {
  const sumQueue = new Queue<SumQueueParams>(
    "sumQueue",
    `redis://${REDIS_HOST}:${REDIS_PORT}`
  );

  // warning: do not await, wait indefinitely, queue.process
  sumQueue.process(function (job, done) {
    try {
      if (typeof job.data.failed === "boolean") {
        // example exception
        const value = "{";
        JSON.parse(value);
      }
      const result = job.data.a + job.data.b;
      // job.id contains id of this job.
      // done(result) // error
      done(null, { done: result });
    } catch (e) {
      // handled exception
      done(e as Error, {});
    }
  });

  sumQueue.on("completed", (job, result): void => {
    // console.log(job.data)
    console.log(`sum Job with id ${job.id} has been completed`);
    console.log(result);
  });

  sumQueue.on("failed", (job, error): void => {
    // console.log(job.data)
    console.log(`sum Job with id ${job.id} has been failed`);
    console.log(error);
  });

  return {
    sumQueue,
  };
}

export async function queueInfo() {
  const { sumQueue } = await startQueue();

  console.log("sumQueue", await sumQueue.getJobCounts());
  await Promise.all([sumQueue.close()]);
}

export async function queueClean() {
  const { sumQueue } = await startQueue();

  await Promise.all([sumQueue.removeRepeatable(cronConfig)]);
  await Promise.all([sumQueue.close()]);
}
