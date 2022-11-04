import { assert } from "chai";
import { logger } from "../src/utils";

describe("logger", function () {
  it("info log", async function () {
    const v = logger.info("test info message");
    assert.isDefined(v);
  });

  it("error log", async function () {
    const v = logger.error("test error message", {
      details: "...",
    });
    assert.isDefined(v);
  });
});
