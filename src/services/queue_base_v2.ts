import { QueueWrapperV2 } from "../interfaces";
import { Queue } from "bullmq";

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

  close(): Promise<void> {
    return this.instance().close();
  }

  async clean(): Promise<void> {
    throw new Error("not implemented");
  }

  async resume(): Promise<void> {
    console.log(this.instance().name, await this.instance().getJobCounts());
    await this.close();
  }
}
