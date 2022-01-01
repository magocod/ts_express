import { assert } from "chai";
import supertest from "supertest";

import { asyncCreateApp } from "../src/factory";
import { Express } from "express";
import { getConnection } from "typeorm";

describe("sample-error", () => {
  let app: Express;

  before(async () => {
    app = await asyncCreateApp();
  });

  after(async () => {
    await getConnection().close();
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
