import { assert } from "chai";
import supertest from "supertest";

import { DataSource } from "typeorm";
import { asyncCreateApp } from "../src/factory";

describe("sample", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let ds: DataSource;

  before(async function () {
    const { app, dataSource } = await asyncCreateApp();
    ds = dataSource;
    httpClient = supertest(app);
  });

  after(async function () {
    await ds.destroy();
  });

  it("responds with json", async function () {
    const response = await httpClient.get("/test").expect(200);

    // console.log(response);
    assert.equal(response.body, response.body, "response.body");
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
});
