import { assert } from "chai";
// import { successHandler } from "../src/controllers/func.controller";
// import { Request, Response } from "express";
// import { mockExpressResponse, stubExpressResponse } from "./helpers";

describe("unit_sample", function () {
  it("basic", function () {
    assert.equal(5 + 5, 10);
  });

  // it("successHandler", async function () {
  //   const req = {} as Request;
  //   const res = {
  //     json: (v: unknown) => {
  //       return v;
  //     },
  //   } as Response;
  //   const rs = await successHandler(req, res);
  //
  //   assert.deepEqual(rs, { message: "message" } as unknown);
  // });
  //
  // it("successHandler, mockExpressResponse", async function () {
  //   const req = {
  //     body: {
  //       email: "email@domain",
  //       password: "123",
  //     },
  //   } as Request;
  //   const res = mockExpressResponse();
  //   // const rs = await login(req, res as unknown as Response);
  //   // console.log(rs.json)
  //   await successHandler(req, res as unknown as Response);
  //
  //   // assert.deepEqual(res.status?.calledWith(200), true);
  //   assert.deepEqual(res.json?.calledWith({ message: "message" }), true);
  // });
  //
  // it("successHandler, stubExpressResponse", async function () {
  //   const req = {
  //     body: {
  //       email: "email@domain",
  //       password: "123",
  //     },
  //   } as Request;
  //   const stubRes = stubExpressResponse();
  //   // const rs = await login(req, stubRes.res);
  //   // console.log(rs);
  //   await successHandler(req, stubRes.res);
  //
  //   assert.deepEqual(stubRes.json.calledWith({ message: "message" }), true);
  // });
});
