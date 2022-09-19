import { assert } from "chai";
import supertest from "supertest";

import { createApp } from "../src/app.factory";

const baseRoute = "/functions";

describe("example_integration", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(function () {
    const app = createApp();
    httpClient = supertest(app);
  });

  it("base url", async function () {
    const response = await httpClient.get("/");
    assert.equal(response.status, 200);
  });

  it("not found url", async function () {
    const response = await httpClient.get("/not_exist");
    assert.equal(response.status, 404);
    assert.deepEqual(response.body, {
      message: "Not Found",
      msg: "general exception message",
    });
  });

  describe("express extend functions", function () {
    let httpClient: supertest.SuperTest<supertest.Test>;

    before(function () {
      const app = createApp();
      httpClient = supertest(app);
    });

    it("success, added function", async function () {
      const response = await httpClient.post(`${baseRoute}/success_handler`);

      assert.equal(response.status, 200);
      assert.deepEqual(response.body, { message: "res.success", data: {} });
    });

    it("error, added function", async function () {
      const response = await httpClient.post(`${baseRoute}/error_handler`);

      assert.equal(response.status, 500);
      assert.deepEqual(response.body, {
        message: "example code error message",
        msg: "example message",
      });
    });
  });
});
