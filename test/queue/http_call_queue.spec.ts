import { assert } from "chai";
import app from "../../src/app";
import supertest from "supertest";

import { pool, MinusQueueParams } from "../../src/services/queue_pool";
import {
  transporter,
  EmailQueueParams,
  emailQueue,
  SendEmailConfig,
} from "../../src/services/email";

import { chance, FakeQueue } from "../fixtures";

import { createSandbox } from "sinon";
import { Queue } from "bull";

const httpClient = supertest(app);

const baseRoute = "/queue";

const sandbox = createSandbox();

function generateRequest(failed = false): MinusQueueParams {
  return {
    a: chance.integer({ min: 1, max: 10 }),
    b: chance.integer({ min: 1, max: 10 }),
    failed,
  };
}

function generateEmailRequest(): SendEmailConfig {
  return {
    to: chance.email(),
    subject: chance.string(),
    text: chance.string(),
    data: {
      message: chance.guid(),
    },
  };
}

function generateQueueEmailRequest(failed = false): EmailQueueParams {
  return {
    ...generateEmailRequest(),
    failed,
  };
}

describe("http_call_queue", function () {
  beforeEach(function () {
    sandbox
      .stub(pool, "minusQueue")
      .returns(new FakeQueue() as unknown as Queue);

    sandbox.stub(transporter, "sendMail").returns(
      new Promise((resolve) => {
        resolve({ messageId: chance.guid() });
      })
    );

    sandbox
      .stub(emailQueue, "instance")
      .returns(new FakeQueue() as unknown as Queue);
  });

  afterEach(async function () {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
    // await pool.closeAll()
  });

  it("simple call", async function () {
    const requestData = generateRequest();
    const response = await httpClient
      .post(`${baseRoute}/call`)
      .send(requestData);

    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("simple email", async function () {
    const requestData = generateEmailRequest();
    const response = await httpClient
      .post(`${baseRoute}/simple_email`)
      .send(requestData);

    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("email_to_queue", async function () {
    const requestData = generateQueueEmailRequest();
    const response = await httpClient
      .post(`${baseRoute}/email_to_queue`)
      .send(requestData);

    // console.log(response.body);
    assert.equal(response.status, 200);
  });
});
