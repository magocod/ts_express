// import assert from "assert";
import { assert } from "chai";

import supertest from "supertest";

import app from "../../../src/app.es6";
import db from "../../../src/models";

const Transaction = db.Transaction;

import { generate_transaction } from "../../fixtures/transaction";

describe("GET transactions list", function () {
  it("find all", async () => {
    await generate_transaction();
    const data = await Transaction.findAll();
    const response = await supertest(app).get("/transactions");
    // .expect(200, done);
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.equal(JSON.stringify(response.body), JSON.stringify(data));
  });
});
