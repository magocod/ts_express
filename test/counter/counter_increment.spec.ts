import { assert } from "chai";
import supertest from "supertest";

import { createApp } from "../../src/app.factory";

const baseRoute = "/functions/counter_increment";

describe("counter_increment", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(function () {
    const app = createApp();
    httpClient = supertest(app);
  });

  it("counter increment", async function () {
    const response = await httpClient.post(baseRoute);

    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.deepEqual(response.body.data, { initCount: 0, count: 1 });
  });
});
