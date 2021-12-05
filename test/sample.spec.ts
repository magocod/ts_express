import { assert } from "chai";
import app from "../src/app.es6";
import supertest from "supertest";

describe("sample", () => {
  it("responds with json", async () => {
    const response = await supertest(app).get("/test");
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { prop: "hello test" }, "response.body");
  });

  it("responds with internal error", async () => {
    const response = await supertest(app).get("/error");
    // console.log(response.body);
    assert.equal(response.status, 500);
    assert.deepEqual(
      response.body,
      { message: "Unexpected token } in JSON at position 0" },
      "response.body"
    );
  });
});
