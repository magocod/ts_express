import { assert } from "chai";
import supertest from "supertest";

import { DataSource } from "typeorm";
import { asyncCreateApp } from "../../src/factory";
import { generateToken } from "../../src/services/auth";

import { User } from "../../src/entity";

import { generateUser, generateAuthHeader } from "../fixtures";

function generateRequest(user: User, password = "123") {
  return {
    email: user.email,
    password,
  };
}

const baseRoute = "/auth";

describe("auth", function () {
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

  it("successful login", async function () {
    const { user } = await generateUser(ds);
    const requestData = generateRequest(user);

    const response = await httpClient
      .post(`${baseRoute}/login`)
      .send(requestData);

    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(response.body, response.body, "response.body");
  });

  it("passwords do not match", async function () {
    const { user } = await generateUser(ds);
    const requestData = generateRequest(user);
    requestData.password = "wrong_password";

    const response = await httpClient
      .post(`${baseRoute}/login`)
      .send(requestData);

    // console.log(response.body);
    assert.equal(response.status, 403);
    // assert.equal(response.body, response.body, "response.body");
  });

  describe("header and token verification", function () {
    it("valid token", async function () {
      const { token } = await generateUser(ds);

      const response = await httpClient
        .get(`${baseRoute}/current_user`)
        .set("Authorization", generateAuthHeader(token));

      // console.log(response.body);
      assert.equal(response.status, 200);
      // assert.equal(response.body, response.body, "response.body");
    });

    it("invalid token", async function () {
      const response = await httpClient
        .get(`${baseRoute}/current_user`)
        .set("Authorization", generateAuthHeader('invalid'));

      // console.log(response.body);
      assert.equal(response.status, 403);
      // assert.equal(response.body, response.body, "response.body");
    })

    it("invalid token secret", async function () {
      const tokenSecret = "other-secret";
      const { user } = await generateUser(ds);
      const token = generateToken(user, tokenSecret);

      const response = await httpClient
        .get(`${baseRoute}/current_user`)
        .set("Authorization", generateAuthHeader(token));

      // console.log(response.body);
      assert.equal(response.status, 403);
      // assert.equal(response.body, response.body, "response.body");
    })
  });
});
