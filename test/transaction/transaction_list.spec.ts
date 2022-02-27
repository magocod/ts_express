// import assert from "assert";
import { assert } from "chai";

import supertest from "supertest";

import app from "../../src/app.es6";

import { generate_transaction } from "../fixtures";
import { addQueryString, basicPagination } from "../helpers";

// import { Transaction } from "../../src/models";
// import { getModel, Transaction } from "../../../src/models";
// const transaction = getModel<Transaction>('Transaction');

const baseUrl = "/transactions";

describe("GET transactions list", function () {
  it("unfiltered", async () => {
    const qs = basicPagination();
    await generate_transaction();
    // const data = await Transaction.findAll();

    const response = await supertest(app).get(baseUrl);
    // .expect(200, done);

    console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(JSON.stringify(response.body), JSON.stringify(data));
  });

  it("paginate, next", async () => {
    const qs = basicPagination();
    qs.page = 1;
    qs.limit = 4;

    await generate_transaction();
    // const data = await Transaction.findAll();

    const response = await supertest(app).get(addQueryString(baseUrl, qs));
    // .expect(200, done);

    console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(JSON.stringify(response.body), JSON.stringify(data));
  });

  it("paginate, previous", async () => {
    const qs = basicPagination();
    qs.page = 2;
    qs.limit = 4;

    await generate_transaction();
    // const data = await Transaction.findAll();

    const response = await supertest(app).get(addQueryString(baseUrl, qs));
    // .expect(200, done);

    console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(JSON.stringify(response.body), JSON.stringify(data));
  });
});
