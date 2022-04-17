import { DivisionQueue, divisionQueue } from "./division_queue";
import { PaintQueue, paintQueue } from "./paint";
import { QueuePoolWrapper } from "../interfaces";

export class QueuePoolV2 implements QueuePoolWrapper {
  private _divisionQueue: DivisionQueue;
  private _paintQueue: PaintQueue;

  // don't use constructor to start redis connection
  // don't do this, this.boot in the constructor
  constructor() {
    this._divisionQueue = divisionQueue;
    this._paintQueue = paintQueue;
  }

  boot(): void {
    this._divisionQueue.boot();
    this._paintQueue.boot();
  }

  divisionQueue() {
    return this._divisionQueue.instance();
  }

  paintQueue() {
    return this._paintQueue.instance();
  }

  async clean(): Promise<void> {
    // ...
    await this.close();
  }

  async close(): Promise<void> {
    await Promise.all([this._divisionQueue.close(), this._paintQueue.close()]);
    // ...
  }

  async resume(): Promise<void> {
    await this._divisionQueue.resume();
    await this._paintQueue.resume();
    // ...
  }
}

export const poolV2 = new QueuePoolV2();
