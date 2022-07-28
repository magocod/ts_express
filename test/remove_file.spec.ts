import { assert } from "chai";
// import { promises as fsp } from "fs";
//
// import { tmpPath } from "../src/constants";

import { tmpInit } from "../src/services";

describe("remove_file", function () {
  it("tmpInit", async function () {
    await tmpInit()
    assert.equal(5 + 5, 10);
  });

  // it("fs, file", async function () {
  //   await fsp.unlink(tmpPath + "/txt/1658927479068-820365950.txt");
  //   assert.equal(5 + 5, 10);
  // });

  // it("fs, directory", async function () {
  //   await fsp.rm(tmpPath + "/txt/", { recursive: true });
  //   assert.equal(5 + 5, 10);
  // });
});
