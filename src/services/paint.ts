// import { QueueWrapperV2 } from "../interfaces";
import { BaseQueueV2 } from "./queue_base_v2";
import {
  Queue,
  Worker,
  QueueEvents,
  Job,
  ConnectionOptions,
  QueueScheduler,
} from "bullmq";
import { delay } from "../utils";

// FIXME env - redis
const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;

export interface PaintConfig {
  color: string;
}

export interface PaintParams extends PaintConfig {
  failed?: boolean;
}

export type PaintJobName = "cars" | "animals";

export interface PaintResult {
  ok: boolean;
  data: unknown;
}

export async function paintCar(color: string): Promise<PaintResult> {
  return {
    ok: true,
    data: color,
  };
}

const queueName = "Paint";

const connection: ConnectionOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  // maxRetriesPerRequest: 1,
};

export class PaintQueue extends BaseQueueV2<
  PaintParams,
  PaintResult,
  PaintJobName
> {
  // private _queue: Queue<PaintParams> | undefined;

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

    const paintQueue = new Queue<PaintParams, PaintResult, PaintJobName>(
      queueName,
      { connection }
    );
    // paintQueue.add('cars', { color: '' });

    const worker = new Worker<PaintParams, PaintResult, PaintJobName>(
      queueName,
      async (job) => {
        let rs: PaintResult;
        await delay();
        if (job.name === "cars") {
          rs = await paintCar(job.data.color);
        } else if (job.name === "animals") {
          rs = await paintCar("other");
        } else {
          rs = await paintCar("default");
        }
        return rs;
      },
      { connection }
    );

    const queueEvents = new QueueEvents(queueName, { connection });

    queueEvents.on("completed", async (result) => {
      // console.log("done painting");
      console.log(`paint Job with id ${result.jobId} has been completed`);
      console.log(result);
      const job = await Job.fromId<PaintParams, PaintResult, PaintJobName>(
        paintQueue,
        result.jobId
      );
      if (job !== undefined) {
        console.log(job.returnvalue);
      }
    });

    queueEvents.on("failed", (result) => {
      // console.log("error painting");
      console.log(`paint Job with id ${result.jobId} has been failed`);
      console.log(result);
    });

    const queueScheduler = new QueueScheduler("Paint", { connection });

    this._queue = paintQueue;
    this._queueScheduler = queueScheduler;
    this._worker = worker;
  }
}

export const paintQueue = new PaintQueue();
