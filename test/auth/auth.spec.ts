import { assert } from "chai";
import supertest from "supertest";

import { Connection } from "typeorm";
import { asyncCreateApp } from "../../src/factory";

import { User } from "../../src/entity";

import { generateUser } from "../fixtures";

function generateRequest(user: User, password = "123") {
  return {
    email: user.email,
    password,
  };
}

describe("auth", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let conn: Connection;

  before(async function () {
    const { app, connection } = await asyncCreateApp();
    conn = connection;
    httpClient = supertest(app);
  });

  after(async function () {
    await conn.close();
  });

  it("successful login", async function () {
    const { user } = await generateUser(conn);
    const requestData = generateRequest(user);

    const response = await httpClient.post("/auth/login").send(requestData);

    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(response.body, response.body, "response.body");
  });

  it("passwords do not match", async function () {
    const { user } = await generateUser(conn);
    const requestData = generateRequest(user);
    requestData.password = "wrong_password";

    const response = await httpClient.post("/auth/login").send(requestData);

    // console.log(response.body);
    assert.equal(response.status, 403);
    // assert.equal(response.body, response.body, "response.body");
  });
});
