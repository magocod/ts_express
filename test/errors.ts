import { assert } from "chai";

import { CustomError, ExampleError,BaseError } from "../src/error";

function callCustomError() {
  throw new CustomError("fn", "fnMessage");
}

function callExampleError() {
  throw new ExampleError();
}

describe("errors", function () {
  describe("custom_error", function () {
    it("throw", function () {
      try {
        throw new CustomError("baz", "bazMessage");
      } catch (e) {
        if (e instanceof CustomError) {
          // console.log(e.name); //CustomError
          // console.log(e.foo); //baz
          // console.log(e.message); //bazMessage
          // console.log(e.stack); //stacktrace
          assert.equal(e.name, "CustomError");
        }
      }
    });

    it("from function", function () {
      try {
        callCustomError();
      } catch (e) {
        if (e instanceof CustomError) {
          // console.log(e.name);
          // console.log(e.foo);
          // console.log(e.message);
          // console.log(e.stack);
          assert.equal(e.name, "CustomError");
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
          // console.log(e.name);
          // console.log(e.msg);
          // console.log(e.message);
          // console.log(e.stack);
          assert.equal(e.name, "ExampleError");
        }
      }
    });

    it("from function", function () {
      try {
        callExampleError();
      } catch (e) {
        if (e instanceof ExampleError) {
          // console.log(e.name);
          // console.log(e.msg);
          // console.log(e.message);
          // console.log(e.stack);
          assert.equal(e.name, "ExampleError");
        }
      }
    });

    it("check with base class", function () {
      try {
        callExampleError();
      } catch (e) {
        if (e instanceof BaseError) {
          // console.log(e.name);
          // console.log(e.msg);
          // console.log(e.message);
          // console.log(e.stack);
          assert.equal(e.name, "ExampleError");
        }
      }
    });
  });
});
