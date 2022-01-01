import { assert } from "chai";
// import app from "../src/app.es6";
import supertest from "supertest";

import { Express } from "express";

// import { checkConnection } from "./configdb";
import { getConnection } from "typeorm";

import { asyncCreateApp } from "../src/factory";

describe("sample", () => {
  let app: Express;

  before(async () => {
    app = await asyncCreateApp();
  });

  after(async () => {
    await getConnection().close();
  });

  it("responds with json", async () => {
    const response = await supertest(app).get("/test").expect(200);
    // console.log(response);
    assert.equal(response.body, response.body, "response.body");
  });
});
