import { assert } from "chai";

import { ExampleError, BaseError } from "../src/error";
// import { createApp } from "../src/app.factory";
// import supertest from "supertest";

function callBaseError() {
  throw new BaseError("from func", 400, "overwrite message");
}

function callExampleError() {
  throw new ExampleError();
}

describe("errors", function () {
  // let httpClient: supertest.SuperTest<supertest.Test>;
  //
  // before(function () {
  //   const app = createApp();
  //   // app.get("/sync", (_req: Request, res: Response) => {
  //   //   callExampleError();
  //   //   res.json({});
  //   // });
  //   httpClient = supertest(app);
  // });

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

  // describe("express", function () {
  //   it("with express, sync code", async function () {
  //     const response = await httpClient.get("/sync_handler");
  //     // console.log(response.body);
  //     assert.equal(response.status, 500);
  //   });
  //
  //   it("with express, async code", async function () {
  //     const response = await httpClient.get("/async_handler");
  //     // console.log(response.body);
  //     assert.equal(response.status, 500);
  //   });
  // });
});
