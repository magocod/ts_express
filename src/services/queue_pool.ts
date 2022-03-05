import Queue from "bull";

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

    // add instance
    this._minusQueue = minusQueue;
    this._multiplyQueue = multiplyQueue;
  }

  minusQueue() {
    return this._minusQueue;
  }

  multiplyQueue() {
    return this._multiplyQueue;
  }

  closeAll() {
    return Promise.all([
      this._minusQueue.close(),
      this._multiplyQueue.close(),
    ]);
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
