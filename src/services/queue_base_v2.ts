import { QueueWrapperV2 } from "../interfaces";
import { Queue, QueueScheduler, Worker } from "bullmq";

// FIXME env - redis
// TODO bull - reusable client
// const REDIS_HOST = "127.0.0.1";
// const REDIS_PORT = 6379;

// FIXME exception - reuse
const queueException = "queue not initialized";

export abstract class BaseQueueV2<T, R, N extends string>
  implements QueueWrapperV2<T, R, N>
{
  protected _queue: Queue<T, R, N> | undefined;
  protected _worker: Worker<T, R, N> | undefined;
  protected _queueScheduler: QueueScheduler | undefined;

  // don't use constructor to start redis connection
  // don't do this, this.boot in the constructor
  // constructor() {
  // }

  boot(): void {
    throw new Error("not implemented");
  }

  instance(): Queue<T, R, N> {
    if (this._queue === undefined) {
      throw new Error(queueException);
    }
    return this._queue;
  }

  scheduler(): QueueScheduler {
    if (this._queueScheduler === undefined) {
      throw new Error(queueException);
    }
    return this._queueScheduler;
  }

  worker(): Worker<T, R, N> {
    if (this._worker === undefined) {
      throw new Error(queueException);
    }
    return this._worker;
  }

  async close(): Promise<void> {
    await this.scheduler().close();
    await this.worker().close();
    await this.instance().close();
  }

  async clean(): Promise<void> {
    await this.instance().drain();
  }

  async resume(): Promise<void> {
    console.log(this.instance().name, await this.instance().getJobCounts());
    await this.close();
  }
}
