import { assert } from "chai";
import app from "../../src/app";
import supertest from "supertest";

const httpClient = supertest(app);

const baseRoute = "/users";

describe("user_crud", function () {
  it("findAll", async function () {
    const response = await httpClient.get(baseRoute);

    assert.equal(response.status, 500);
  });

  it("post", async function () {
    const response = await httpClient.post(baseRoute);

    assert.equal(response.status, 500);
  });

  it("find", async function () {
    const userId = 1;
    const response = await httpClient.get(`${baseRoute}/${userId}`);

    assert.equal(response.status, 500);
  });

  it("update", async function () {
    const userId = 1;
    const response = await httpClient.put(`${baseRoute}/${userId}`);

    assert.equal(response.status, 500);
  });

  it("delete", async function () {
    const userId = 1;
    const response = await httpClient.delete(`${baseRoute}/${userId}`);

    assert.equal(response.status, 500);
  });
});
