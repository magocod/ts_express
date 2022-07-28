import { assert } from "chai";
import app from "../../src/app";
import supertest from "supertest";
import { addQueryString } from "../helpers";

const httpClient = supertest(app);

const baseRoute = "/uploads";

const downloadRoute = `${baseRoute}/download`;

describe("download_file", function () {
  it("file exist", async function () {
    const qs = {
      filename: "sample.pdf",
    };

    const response = await httpClient.get(addQueryString(downloadRoute, qs));

    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("file not exist", async function () {
    const qs = {
      filename: "not_exist.pdf",
    };

    const response = await httpClient.get(addQueryString(downloadRoute, qs));

    // console.log(response.body);
    assert.equal(response.status, 404);
  });
});
