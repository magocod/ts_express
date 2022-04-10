import { assert } from "chai";
import app from "../src/app";
import supertest from "supertest";

const httpClient = supertest(app);

describe("sample", function () {
  it("responds with json", async function () {
    const response = await supertest(app).get("/test");
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { prop: "hello test" }, "response.body");
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

  it("responds with internal error, async code", async function () {
    const response = await httpClient.get("/next_error");
    // console.log(response.body);
    assert.equal(response.status, 500);
  });
});
