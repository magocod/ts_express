import { assert } from "chai";

import singletonCounter, { Counter } from "../src/services/count";

describe("singleton", () => {
  it("module", async () => {
    assert.equal(singletonCounter.getName(), "default");
  });

  it("instance", async () => {
    const counter = new Counter("other");
    assert.equal(counter.getName(), "other");
  });
});
