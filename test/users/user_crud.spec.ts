import { assert } from "chai";
import app from "../../src/app";
import supertest from "supertest";

const httpClient = supertest(app);

const baseRoute = "/users";

describe("user_crud", () => {
  it("findAll", async () => {
    const response = await httpClient.get(baseRoute);

    assert.equal(response.status, 500);
  });

  it("post", async () => {
    const response = await httpClient.post(baseRoute);

    assert.equal(response.status, 500);
  });

  it("find", async () => {
    const userId = 1;
    const response = await httpClient.get(`${baseRoute}/${userId}`);

    assert.equal(response.status, 500);
  });

  it("update", async () => {
    const userId = 1;
    const response = await httpClient.put(`${baseRoute}/${userId}`);

    assert.equal(response.status, 500);
  });

  it("delete", async () => {
    const userId = 1;
    const response = await httpClient.delete(`${baseRoute}/${userId}`);

    assert.equal(response.status, 500);
  });
});
