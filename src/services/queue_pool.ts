import Queue from "bull";

import { delay } from "../utils";

const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;

const cronConfig = {
  cron: "* * * * * *",
};

export interface MinusQueueParams {
  a: number;
  b: number;
  failed?: boolean;
}

export interface MultiplyQueueParams {
  c: number;
  d: number;
  failed?: boolean;
}

export class QueuePool {
  private readonly _minusQueue: Queue.Queue<MinusQueueParams>;
  private readonly _multiplyQueue: Queue.Queue<MultiplyQueueParams>;

  constructor() {
    const { minusQueue, multiplyQueue } = this.boot();
    // add instance
    this._minusQueue = minusQueue;
    this._multiplyQueue = multiplyQueue;
  }

  boot() {
    // MINUS QUEUE
    const minusQueue = new Queue<MinusQueueParams>("minusQueue", {
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        maxRetriesPerRequest: 1,
      },
    });

    // warning: do not await, wait indefinitely, queue.process
    minusQueue.process(async function (job, done) {
      try {
        await delay();
        // console.log(job.attemptsMade)
        if (job.data.failed === true) {
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

    minusQueue.on("completed", (job, result) => {
      console.log(`minus Job with id ${job.id} has been completed`);
      console.log(result);
    });

    minusQueue.on("failed", (job, error) => {
      console.log(`minus Job with id ${job.id} has been failed`);
      console.log(error);
    });

    minusQueue.on("waiting", (jobId) => {
      console.log(`minus Job with id ${jobId} has been waiting`);
    });

    minusQueue.on("stalled", (jobId) => {
      console.log(`minus Job with id ${jobId} has been stalled`);
    });

    // MULTIPLY QUEUE
    const multiplyQueue = new Queue<MultiplyQueueParams>(
      "multiplyQueue",
      `redis://${REDIS_HOST}:${REDIS_PORT}`
    );

    // warning: do not await, wait indefinitely, queue.process
    multiplyQueue.process(function (job, done) {
      try {
        if (job.data.failed === true) {
          // example exception
          const value = "{";
          JSON.parse(value);
        }
        const result = job.data.c * job.data.d;
        // job.id contains id of this job.
        // done(result) // error
        done(null, { done: result });
      } catch (e) {
        // handled exception
        done(e as Error, {});
      }
    });

    multiplyQueue.on("completed", (job, result) => {
      console.log(`multiply Job with id ${job.id} has been completed`);
      console.log(result);
    });

    multiplyQueue.on("failed", (job, error) => {
      console.log(`multiply Job with id ${job.id} has been failed`);
      console.log(error);
    });

    return {
      minusQueue,
      multiplyQueue,
    };
  }

  minusQueue() {
    return this._minusQueue;
  }

  multiplyQueue() {
    return this._multiplyQueue;
  }

  closeAll() {
    return Promise.all([this._minusQueue.close(), this._multiplyQueue.close()]);
  }

  removeAllRepeatable() {
    return Promise.all([
      this._minusQueue.removeRepeatable(cronConfig),
      this._multiplyQueue.removeRepeatable(cronConfig),
    ]);
  }

  async clean() {
    await this.removeAllRepeatable();
    await this.closeAll();
  }

  async resume() {
    console.log("minusQueue", await this._minusQueue.getJobCounts());
    console.log("multiplyQueue", await this._multiplyQueue.getJobCounts());
    await this.closeAll();
  }
}

export default new QueuePool();
