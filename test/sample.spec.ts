import { assert } from "chai";
import supertest from "supertest";

import { asyncCreateApp } from "../src/factory";
import { destroyAll, DataSourceGroup } from "../src/data_source";

describe("sample", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let ds: DataSourceGroup;

  before(async function () {
    const { app, dsg } = await asyncCreateApp();
    ds = dsg;
    httpClient = supertest(app);
  });

  after(async function () {
    await destroyAll([ds.argDs, ds.mxDs]);
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
