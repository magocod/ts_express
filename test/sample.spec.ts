import { assert } from "chai";
import app from "../src/app.es6";
import supertest from "supertest";
// import mongoose from "mongoose";
// import { dbConfig } from "../src/config/db.config";

const httpClient = supertest(app);

describe("sample", () => {
  // let mongooseConnection: typeof mongoose;
  //
  // before(async function () {
  //   mongooseConnection = await mongoose.connect(dbConfig.url);
  // });
  //
  // after(async function () {
  //   await mongooseConnection.connection.close();
  // });

  it("responds with json", async () => {
    const response = await supertest(app).get("/test");
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { prop: "hello test" }, "response.body");
  });

  it("responds with internal error", async () => {
    const response = await httpClient.get("/error");
    // console.log(response.body);
    assert.equal(response.status, 500);
    assert.deepEqual(
      response.body,
      { message: "Unexpected token } in JSON at position 0" },
      "response.body"
    );
  });
});
