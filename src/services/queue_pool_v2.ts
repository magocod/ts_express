import { DivisionQueue, divisionQueue } from "./division_queue";
import { QueuePoolWrapper } from "../interfaces";

export class QueuePoolV2 implements QueuePoolWrapper {
  private _divisionQueue: DivisionQueue;

  // don't use constructor to start redis connection
  // don't do this, this.boot in the constructor
  constructor() {
    this._divisionQueue = divisionQueue;
  }

  boot(): void {
    this._divisionQueue.boot();
  }

  divisionQueue() {
    return this._divisionQueue.instance();
  }

  async clean(): Promise<void> {
    // ...
    await this.close();
  }

  async close(): Promise<void> {
    await Promise.all([this._divisionQueue.close()]);
    // ...
  }

  async resume(): Promise<void> {
    await this._divisionQueue.resume();
    // ...
  }
}

export const poolV2 = new QueuePoolV2();
