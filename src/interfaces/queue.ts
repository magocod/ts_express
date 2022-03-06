export interface QueueWrapper {
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
