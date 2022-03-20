import { assert } from "chai";
// import app from "../src/app.es6";
import supertest from "supertest";

// import { checkConnection } from "./configdb";
import { Connection, getConnection } from "typeorm";
import { asyncCreateApp } from "../src/factory";

describe("sample", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let conn: Connection;

  before(async function () {
    const { app, connection } = await asyncCreateApp();
    conn = connection;
    httpClient = supertest(app);
  });

  after(async function () {
    // await getConnection().close();
    await conn.close();
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
