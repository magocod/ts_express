import { chance } from "./index";

// import { Queue, Job } from "bull";
3;
export class FakeJob {
  _data: unknown;

  constructor(data: unknown) {
    this._data = data;
  }

  toJSON() {
    return {
      id: chance.integer().toString(),
      name: "__default__",
      data: this._data,
    };
  }
}

export class FakeQueue {
  add(data: unknown) {
    return new FakeJob(data);
  }
}

export class FakeQueuePool {
  constructor() {
    // pass
  }

  minusQueue() {
    return new FakeQueue();
  }
}
