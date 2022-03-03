import Queue from "bull";

const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;

export interface MinusQueueParams {
  a: number;
  b: number;
  failed?: boolean;
}

export interface MultiplyQueueParams {
  a: number;
  b: number;
  failed?: boolean;
}

export interface QueuesPool {
  minusQueue: Queue.Queue<MinusQueueParams>;
  multiplyQueue: Queue.Queue<MultiplyQueueParams>;
}

export type QueuesNames = keyof QueuesPool;

export class QueuePool {
  private readonly _queuesPool: QueuesPool;

  constructor() {
    // MINUS QUEUE

    const minusQueue = new Queue<MinusQueueParams>(
      "minusQueue",
      `redis://${REDIS_HOST}:${REDIS_PORT}`
    );

    // warning: do not await, wait indefinitely, queue.process
    minusQueue.process(async (job, done) => {
      try {
        if (typeof job.data.failed === "boolean") {
          // example exception
          const value = "{";
          JSON.parse(value);
        }
        const result = job.data.a + job.data.b;
        // job.id contains id of this job.
        console.log(`sum Job with id ${job.id} result:`, result);
        // done(result) // error
        done(null, { done: result });
      } catch (e) {
        // handled exception
        done(e as Error, {});
      }
    });

    minusQueue.on("completed", (job, result) => {
      console.log(`app minus Job with id ${job.id} has been completed`);
      console.log(result);
    });

    minusQueue.on("failed", (job, error) => {
      console.log(`app minus Job with id ${job.id} has been failed`);
      console.log(error);
    });

    // MULTIPLY QUEUE

    const multiplyQueue = new Queue<MultiplyQueueParams>(
      "multiplyQueue",
      `redis://${REDIS_HOST}:${REDIS_PORT}`
    );

    // warning: do not await, wait indefinitely, queue.process
    multiplyQueue.process(async (job, done) => {
      try {
        if (typeof job.data.failed === "boolean") {
          // example exception
          const value = "{";
          JSON.parse(value);
        }
        const result = job.data.a + job.data.b;
        // job.id contains id of this job.
        console.log(`sum Job with id ${job.id} result:`, result);
        // done(result) // error
        done(null, { done: result });
      } catch (e) {
        // handled exception
        done(e as Error, {});
      }
    });

    multiplyQueue.on("completed", (job, result) => {
      console.log(`app multiply Job with id ${job.id} has been completed`);
      console.log(result);
    });

    multiplyQueue.on("failed", (job, error) => {
      console.log(`app multiply Job with id ${job.id} has been failed`);
      console.log(error);
    });

    this._queuesPool = {
      minusQueue,
      multiplyQueue,
    };
  }

  get(name: QueuesNames) {
    return this._queuesPool[name];
  }

  close(name: QueuesNames) {
    return this._queuesPool[name].close();
  }

  closeAll() {
    return Promise.all([
      this._queuesPool.minusQueue,
      this._queuesPool.multiplyQueue,
    ]);
  }
}

export default new QueuePool();
