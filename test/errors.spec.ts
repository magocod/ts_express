import { assert } from "chai";

import {
  ExampleError,
  BaseError,
  NotFoundError,
  UnImplementedError,
} from "../src/error";
import { extendExpressApi } from "../src/app.factory";
import supertest from "supertest";
import express, { Router } from "express";
import { errorHandler } from "../src/utils";

function callBaseError() {
  throw new BaseError("from func", 400, "overwrite message");
}

function callExampleError() {
  throw new ExampleError();
}

async function someCode() {
  throw new UnImplementedError();
}

describe("errors", function () {
  describe("base_error", function () {
    it("throw", function () {
      try {
        throw new BaseError("baz", 400, "bazMessage");
      } catch (e) {
        if (e instanceof BaseError) {
          assert.equal(e.message, "bazMessage");
          assert.equal(e.name, "BaseError");
          assert.equal(e.msg, "baz");
          assert.equal(e.status, 400);
        }
      }
    });

    it("from function", function () {
      try {
        callBaseError();
      } catch (e) {
        if (e instanceof BaseError) {
          assert.equal(e.message, "overwrite message");
          assert.equal(e.name, "BaseError");
          assert.equal(e.msg, "from func");
          assert.equal(e.status, 400);
        }
      }
    });
  });

  describe("example_error", function () {
    it("throw", function () {
      try {
        throw new ExampleError();
      } catch (e) {
        if (e instanceof ExampleError) {
          assert.equal(e.message, "example code error message");
          assert.equal(e.name, "ExampleError");
          assert.equal(e.msg, "example message");
          assert.equal(e.status, 500);
        }
      }
    });

    it("from function", function () {
      try {
        callExampleError();
      } catch (e) {
        if (e instanceof ExampleError) {
          assert.equal(e.message, "example code error message");
          assert.equal(e.name, "ExampleError");
          assert.equal(e.msg, "example message");
          assert.equal(e.status, 500);
        }
      }
    });

    it("check with base class", function () {
      try {
        callExampleError();
      } catch (e) {
        if (e instanceof BaseError) {
          assert.equal(e.message, "example code error message");
          assert.equal(e.name, "ExampleError");
          assert.equal(e.msg, "example message");
          assert.equal(e.status, 500);
        }
      }
    });
  });

  describe("express", function () {
    it("with express, sync code", async function () {
      const testApp = express();
      extendExpressApi(testApp);

      const extraRouter = Router();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extraRouter.get("/test_sync", function (_req, _res) {
        throw new NotFoundError();
      });

      testApp.use("/extra", extraRouter);
      testApp.use(errorHandler);

      const httpClient = supertest(testApp);
      const response = await httpClient.get("/extra/test_sync");

      console.log(response.body);
      assert.equal(response.status, 404);
      assert.deepEqual(response.body, {
        message: "not found error",
        msg: "not found error",
      });
    });

    it("with express, async code", async function () {
      const testApp = express();
      extendExpressApi(testApp);

      const extraRouter = Router();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extraRouter.get("/test_async", function (_req, res, next) {
        someCode().catch(next);
      });

      testApp.use("/extra", extraRouter);
      testApp.use(errorHandler);

      const httpClient = supertest(testApp);
      const response = await httpClient.get("/extra/test_async");

      console.log(response.body);
      assert.equal(response.status, 400);
      assert.deepEqual(response.body, {
        message: "unimplemented",
        msg: "unimplemented",
      });
    });
  });
});
