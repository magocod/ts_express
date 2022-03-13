import { assert } from "chai";
// import app from "../src/app.es6";
import supertest from "supertest";

// import { checkConnection } from "./configdb";
import { getConnection } from "typeorm";
import { asyncCreateApp } from "../src/factory";

describe("sample", () => {
  let httpClient: supertest.SuperTest<supertest.Test>;

  before(async () => {
    const { app } = await asyncCreateApp();
    httpClient = supertest(app);
  });

  after(async () => {
    await getConnection().close();
  });

  it("responds with json", async () => {
    const response = await httpClient.get("/test").expect(200);

    // console.log(response);
    assert.equal(response.body, response.body, "response.body");
  });

  it("responds with internal error", async () => {
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
