import { QueueWrapper } from "../interfaces";
import Queue from "bull";

// FIXME env - redis
// TODO bull - reusable client
// const REDIS_HOST = "127.0.0.1";
// const REDIS_PORT = 6379;

// FIXME exception - reuse
const queueException = "queue not initialized";

export abstract class BaseQueue<T> implements QueueWrapper<T> {
  protected _queue: Queue.Queue<T> | undefined;

  // don't use constructor to start redis connection
  // don't do this, this.boot in the constructor
  // constructor() {
  // }

  boot() {
    throw new Error("not implemented");
  }

  instance() {
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
