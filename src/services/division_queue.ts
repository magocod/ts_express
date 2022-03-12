import { QueueWrapper } from "../interfaces";
import Queue from "bull";
import { delay } from "../utils";

import { BaseQueue } from "./queue_base";

// FIXME env - redis
const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;

export interface DivisionQueueParams {
  e: number;
  f: number;
  failed?: boolean;
}

export class DivisionQueue extends BaseQueue<DivisionQueueParams> {
  // _queue: Queue.Queue<DivisionQueueParams> | undefined;

  private booted = false;

  // don't use constructor to start redis connection
  // don't do this, this.boot in the constructor
  // constructor() {
  // }

  boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return;
    }
    this.booted = true;

    const divisionQueue = new Queue<DivisionQueueParams>("divisionQueue", {
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        maxRetriesPerRequest: 1,
      },
    });

    // warning: do not await, wait indefinitely, queue.process
    divisionQueue.process(async function (job): Promise<number> {
      await delay();
      // console.log(job.attemptsMade)
      if (job.data.failed === true) {
        // example exception
        throw new Error("example error");
      }

      return job.data.e / job.data.f;
    });

    divisionQueue.on("completed", (job, result) => {
      console.log(`division Job with id ${job.id} has been completed`);
      console.log(result);
    });

    divisionQueue.on("failed", (job, error) => {
      console.log(`division Job with id ${job.id} has been failed`);
      console.log(error);
    });

    this._queue = divisionQueue;
  }
}

export const divisionQueue = new DivisionQueue();
