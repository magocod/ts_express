import { assert } from "chai";
import supertest from "supertest";

import { createApp } from "../src/app.factory";

describe("sample_app_factory.", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(function () {
    const app = createApp();
    httpClient = supertest(app);
  });

  it("base url", async function () {
    const response = await httpClient.get("/");
    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("responds with json", async function () {
    const response = await httpClient.get("/test");
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { prop: "hello test" }, "response.body");
  });

  it("responds with 404", async function () {
    const response = await httpClient.get("/not_found");
    // console.log(response.body);
    assert.equal(response.status, 404);
    assert.deepEqual(response.body, { message: "Not Found" }, "response.body");
  });

  it("responds with internal error", async function () {
    const response = await httpClient.get("/error");
    // console.log(response.body);
    assert.equal(response.status, 500);
    assert.deepEqual(
      response.body,
      { message: "Unexpected token } in JSON at position 0" },
      "response.body"
    );
  });

  it("responds with internal error, async code", async function () {
    const response = await httpClient.get("/next_error");
    // console.log(response.body);
    assert.equal(response.status, 500);
  });

  it("responds with internal error, sync | async code, without errorHandler", async function () {
    const response = await httpClient.get("/suppress_error");
    // console.log(response.body);
    assert.equal(response.status, 400);
  });
});
