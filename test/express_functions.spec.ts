import { assert } from "chai";

import supertest from "supertest";
import { createApp } from "../src/app.factory";

describe("express_functions", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(function () {
    const app = createApp();
    httpClient = supertest(app);
  });

  it("success, added function", async function () {
    const response = await httpClient.post("/exp_success");
    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("error, added function", async function () {
    const response = await httpClient.post("/exp_error");
    // console.log(response.body);
    assert.equal(response.status, 400);
  });
});
