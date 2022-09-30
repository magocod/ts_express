import { assert } from "chai";
import { counterService } from "../../src/services";
// import { counterServicePath } from "../../src/constants"

describe("counter_service", function () {
  it("instance", function () {
    const initCount = counterService.getCount();
    const count = counterService.increment();
    // console.log(require.cache[counterServicePath])

    // console.log("initCount", initCount, "count", count)
    assert.equal(count, initCount + 1);
  });
});
