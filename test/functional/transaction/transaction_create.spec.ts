// import assert from "assert";
import { assert } from "chai";

import supertest from "supertest";
import faker from "faker";

import app from "../../../src/app.es6";
import db from "../../../src/models";

const Transaction = db.Transaction;

function _baseRequestData() {
  return {
    title: faker.datatype.uuid(),
  };
}

describe("POST transactions create", function () {
  it("create", async () => {
    const request = _baseRequestData();
    const response = await supertest(app).post("/transactions").send(request);
    const data = await Transaction.findByPk(response.body.id);
    // .expect(200, done);
    // console.log(data.toJSON());
    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(JSON.stringify(response.body), JSON.stringify(data.toJSON()));
  });

  it("form error", async () => {
    const request = {};
    const response = await supertest(app).post("/transactions").send(request);
    // .expect(200, done);
    // console.log(data.toJSON())
    // console.log(response.body);
    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
      errors: [{ msg: "titulo invalido", param: "title", location: "body" }],
    });
  });
});
