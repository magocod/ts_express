import Queue from "bull";

import { QueueWrapper } from '../interfaces'

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

const queueException = "queue not initialized";

export class QueuePool implements QueueWrapper {
  private _minusQueue: Queue.Queue<MinusQueueParams> | undefined;
  private _multiplyQueue: Queue.Queue<MultiplyQueueParams> | undefined;

  private booted = false;

  // constructor() {
  //   // open open connections to db, as a side effect
  //   // const { minusQueue, multiplyQueue } = this.boot();
  //   // // add instance
  //   // this._minusQueue = minusQueue;
  //   // this._multiplyQueue = multiplyQueue;
  // }

  boot(): void {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return;
    }
    this.booted = true;

    // MINUS QUEUE
    const minusQueue = new Queue<MinusQueueParams>("minusQueue", {
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        maxRetriesPerRequest: 1,
      },
    });

    // warning: do not await, wait indefinitely, queue.process
    minusQueue.process(async function (job): Promise<number> {
      await delay();
      // console.log(job.attemptsMade)
      if (job.data.failed === true) {
        // example exception
        const value = "{";
        JSON.parse(value);
      }
      return job.data.a + job.data.b;
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
    const multiplyQueue = new Queue<MultiplyQueueParams>("multiplyQueue", {
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    });

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

    // // add instance
    this._minusQueue = minusQueue;
    this._multiplyQueue = multiplyQueue;

    // return {
    //   minusQueue,
    //   multiplyQueue,
    // };
  }

  minusQueue(): Queue.Queue<MinusQueueParams> {
    if (this._minusQueue === undefined) {
      throw new Error(queueException);
    }
    return this._minusQueue;
  }

  multiplyQueue(): Queue.Queue<MultiplyQueueParams> {
    if (this._multiplyQueue === undefined) {
      throw new Error(queueException);
    }
    return this._multiplyQueue;
  }

  close(): Promise<void> {
    throw new Error('not implemented')
  }

  closeAll(): Promise<void[]> {
    // return Promise.all([this._minusQueue.close(), this._multiplyQueue.close()]);
    return Promise.all([
      this.minusQueue().close(),
      this.multiplyQueue().close(),
    ]);
  }

  removeAllRepeatable(): Promise<void[]> {
    // return Promise.all([
    //   this._minusQueue.removeRepeatable(cronConfig),
    //   this._multiplyQueue.removeRepeatable(cronConfig),
    // ]);
    return Promise.all([
      this.minusQueue().removeRepeatable(cronConfig),
      this.multiplyQueue().removeRepeatable(cronConfig),
    ]);
  }

  async clean(): Promise<void> {
    await this.removeAllRepeatable();
    await this.closeAll();
  }

  async resume(): Promise<void> {
    // console.log("minusQueue", await this._minusQueue.getJobCounts());
    // console.log("multiplyQueue", await this._multiplyQueue.getJobCounts());
    console.log("minusQueue", await this.minusQueue().getJobCounts());
    console.log("multiplyQueue", await this.multiplyQueue().getJobCounts());
    await this.closeAll();
  }
}

export const pool = new QueuePool();
