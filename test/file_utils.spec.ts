import { assert } from "chai";
import fs from "fs";

import { tmpPath, exampleTmpPath } from "../src/constants";

import { tmpInit, tmpRemove } from "../src/utils";

describe("file_utils", function () {
  it("tmpInit", async function () {
    await tmpInit();
    assert.isTrue(fs.existsSync(tmpPath));
    assert.isTrue(fs.existsSync(exampleTmpPath));
  });

  it("tmpRemove", async function () {
    await tmpRemove();
    assert.isFalse(fs.existsSync(tmpPath));
    assert.isFalse(fs.existsSync(exampleTmpPath));
  });
});
