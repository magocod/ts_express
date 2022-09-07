import {assert} from "chai";
import { login } from "../src/controllers/auth.controller";
import { Request, Response } from "express";
// import { GenericResponse } from "../src/interfaces";
import { mockExpressResponse } from "./helpers"

describe("unit_sample", function () {
  it("basic", function () {
    assert.equal(5 + 5, 10);
  });

  it("login handler", async function () {
    const req = {} as Request;
    const res = {
      json: (v: unknown) => {
        return v;
      },
    } as Response;
    const rs = await login(req, res);

    assert.deepEqual(rs, { message: "message" } as unknown);
  });

  // it("login handler, helper", async function () {
  //   const req = {} as Request;
  //   const res = mockExpressResponse()
  //   const rs = await login(req, res);
  //
  //   should(res.status).e 200 as unknown)
  //   assert.deepEqual(rs.json(), { message: "message" } as unknown);
  // });
});
