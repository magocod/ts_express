import { Queue } from "bull";

import { Queue as QueueMq } from "bullmq";

export interface QueuePoolWrapper {
  /**
   * start queues
   */
  boot(): void;

  /**
   * close connections with db
   */
  close(): Promise<void>;

  /**
   * clear queues and connection to db
   */
  clean(): Promise<void>;

  /**
   * check current task status
   */
  resume(): Promise<void>;
}

export interface QueueWrapper<T> extends QueuePoolWrapper {
  /**
   * get queue instance, throw error if not started
   */
  instance(): Queue<T>;
}

export interface QueueWrapperV2<T, R, N extends string> extends QueuePoolWrapper {
  /**
   * get queue instance, throw error if not started
   */
  instance(): QueueMq<T, R, N>;
}
