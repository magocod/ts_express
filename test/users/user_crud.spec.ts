import { assert } from "chai";

import supertest from "supertest";

import { asyncCreateApp } from "../../src/factory";
import { DataSource } from "typeorm";

import { generateUser, chance } from "../fixtures";
import { addQueryString, basicPagination } from "../helpers";

import { PagRow } from "../../src/utils";

const baseRoute = "/users";

interface RequestData {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

function generateRequest(): RequestData {
  return {
    email: chance.email(),
    firstName: chance.first(),
    lastName: chance.last(),
  };
}

describe("user_crud", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let ds: DataSource;

  before(async () => {
    const { app, dataSource } = await asyncCreateApp();
    ds = dataSource;
    httpClient = supertest(app);
  });

  after(async () => {
    await ds.destroy();
  });

  describe("findAll", function () {
    it("unfiltered", async function () {
      const response = await httpClient.get(baseRoute);

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });

    it("filter by profile", async function () {
      const qs = basicPagination();
      qs.profile_name = "pa";
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });

    it("page & limit", async function () {
      const qs = basicPagination();
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });

    it("page & limit, all equal 0", async function () {
      const qs = basicPagination();
      qs.page = 0;
      qs.limit = 0;
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });

    it("page & limit, page equal 0", async function () {
      const qs = basicPagination();
      qs.page = 0;
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });

    it("page & limit, limit equal 0", async function () {
      const qs = basicPagination();
      qs.limit = 0;
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });
  });

  it("create", async function () {
    const requestData = generateRequest();
    requestData.password = "123";
    const response = await httpClient.post(baseRoute).send(requestData);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("find", async function () {
    const { user } = await generateUser(ds);
    const userId = user.id;
    const response = await httpClient.get(`${baseRoute}/${userId}`);

    console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("find, not found", async function () {
    const userId = -1;
    const response = await httpClient.get(`${baseRoute}/${userId}`);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 404);
  });

  it("update", async function () {
    const requestData = generateRequest();
    const { user } = await generateUser(ds);
    // console.log(JSON.stringify(user, null, 2));
    const userId = user.id;

    const response = await httpClient
      .put(`${baseRoute}/${userId}`)
      .send(requestData);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 200);
  });

  it("update, not found", async function () {
    const requestData = generateRequest();
    const userId = -1;

    const response = await httpClient
      .put(`${baseRoute}/${userId}`)
      .send(requestData);

    // console.log(JSON.stringify(response.body, null, 2));
    assert.equal(response.status, 404);
  });

  it("delete", async function () {
    const { user } = await generateUser(ds);
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
