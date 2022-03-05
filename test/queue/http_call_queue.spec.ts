import { assert } from "chai";
import app from "../../src/app";
import supertest from "supertest";

import queuePool, { MinusQueueParams } from "../../src/services/queue_pool";

import { chance, FakeQueuePool } from "../fixtures";

import { createSandbox } from "sinon";

const httpClient = supertest(app);

const baseRoute = "/queue/call";

const sandbox = createSandbox();

function generateRequest(failed = false): MinusQueueParams {
  return {
    a: chance.integer({ min: 1, max: 10 }),
    b: chance.integer({ min: 1, max: 10 }),
    failed,
  };
}

// FIXME fake queue call

describe("http_call_queue", function () {
  beforeEach(function () {
    sandbox.stub(queuePool, "boot").returns({
      minusQueue: FakeQueuePool as any,
      multiplyQueue: FakeQueuePool as any,
    });
  });

  afterEach(async function () {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
    await queuePool.closeAll()
  });

  it("simple call", async function () {
    const requestData = generateRequest();
    const response = await httpClient.post(baseRoute).send(requestData);

    console.log(response.body);
    assert.equal(response.status, 200);
  });
});
