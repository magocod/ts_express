import { assert } from "chai";

import supertest from "supertest";

import { asyncCreateApp } from "../../src/factory";
import { Connection, getConnection } from "typeorm";

import { generateUser } from "../fixtures/user";

const baseRoute = "/users";

import { chance } from "../fixtures";

function generateRequest() {
  return {
    firstName: chance.first(),
    lastName: chance.last(),
  };
}

describe("user_crud", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let conn: Connection;

  before(async () => {
    const { app, connection } = await asyncCreateApp();
    conn = connection;
    httpClient = supertest(app);
  });

  after(async () => {
    await getConnection().close();
  });

  it("findAll", async function () {
    const response = await httpClient.get(baseRoute);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("create", async function () {
    const requestData = generateRequest()
    const response = await httpClient.post(baseRoute).send(requestData);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("find", async function () {
    const { user } = await generateUser(conn);
    const userId = user.id;
    const response = await httpClient.get(`${baseRoute}/${userId}`);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("find, not found", async function () {
    const userId = -1;
    const response = await httpClient.get(`${baseRoute}/${userId}`);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 404);
  });

  it("update", async function () {
    const requestData = generateRequest()
    const { user } = await generateUser(conn);
    // console.log(JSON.stringify(user, null, 2));
    const userId = user.id;

    const response = await httpClient.put(`${baseRoute}/${userId}`).send(requestData);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("update, not found", async function () {
    const requestData = generateRequest()
    const userId = 1;

    const response = await httpClient.put(`${baseRoute}/${userId}`).send(requestData);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 404);
  });

  it("delete", async function () {
    const { user } = await generateUser(conn);
    const userId = user.id;
    const response = await httpClient.delete(`${baseRoute}/${userId}`);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("delete, not found", async function () {
    const userId = -1;
    const response = await httpClient.delete(`${baseRoute}/${userId}`);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });
});
