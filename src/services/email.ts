import nodemailer, { TransportOptions, SentMessageInfo } from "nodemailer";

import { QueueWrapper } from "../interfaces";
import Queue from "bull";
import { delay } from "../utils";

// FIXME env - redis
const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;

export interface SendEmailConfig {
  to: string;
  subject: string;
  text: string;
  data: {
    message: string;
  };
}

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
} as TransportOptions);

export async function sendEmail({
  to,
  subject,
  text,
  data,
}: SendEmailConfig): Promise<SentMessageInfo> {
  return transporter.sendMail({
    from: process.env.SMTP_HOST, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html: `<b>Hello world?: ${data.message}</b>`, // html body
  });
}

export interface EmailQueueParams extends SendEmailConfig {
  failed?: boolean;
}

// FIXME exception - reuse
const queueException = "queue not initialized";

export class EmailQueue implements QueueWrapper<EmailQueueParams> {
  private _queue: Queue.Queue<EmailQueueParams> | undefined;

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

    const emailQueue = new Queue<EmailQueueParams>("emailQueue", {
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        maxRetriesPerRequest: 1,
      },
    });

    // warning: do not await, wait indefinitely, queue.process
    emailQueue.process(async function (job): Promise<number> {
      await delay();
      // console.log(job.attemptsMade)
      if (job.data.failed === true) {
        // example exception
        throw new Error("example error");
      }

      return sendEmail({
        to: job.data.to,
        subject: job.data.subject,
        text: job.data.text,
        data: job.data.data,
      });
    });

    emailQueue.on("completed", (job, result) => {
      console.log(`email Job with id ${job.id} has been completed`);
      console.log(result);
    });

    emailQueue.on("failed", (job, error) => {
      console.log(`email Job with id ${job.id} has been failed`);
      console.log(error);
    });

    this._queue = emailQueue;
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

export const emailQueue = new EmailQueue();
