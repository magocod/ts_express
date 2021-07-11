import { assert } from "chai";
import app from "../src/app.es6";
import supertest from "supertest";

describe("sample", () => {
  it("responds with json", async () => {
    const response = await supertest(app).get("/test").expect(200);
    // console.log(response);
    assert.equal(response.body, response.body, "response.body");
  });
});
