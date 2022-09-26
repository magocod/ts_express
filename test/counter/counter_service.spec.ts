import { assert } from "chai";
import { counterService } from "../../src/services";

describe("counter_service", function () {
  it("instance", function () {
    const initCount = counterService.getCount();
    const count = counterService.increment();

    // console.log("initCount", initCount, "count", count)
    assert.equal(count, initCount + 1);
  });
});
