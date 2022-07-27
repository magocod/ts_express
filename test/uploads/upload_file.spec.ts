import { assert } from "chai";
import app from "../../src/app";
import supertest from "supertest";
import path from "path";

const httpClient = supertest(app);

const baseRoute = "/uploads";

const simpleRoute = `${baseRoute}/simple`;
const multipleRoute = `${baseRoute}/multiple`;

describe("upload_files", function () {
  it("simple file upload", async function () {
    // console.log("dirname", __dirname);
    // console.log(path.resolve(__dirname, "../../resources/skeleton.jpg"))

    const response = await httpClient
      .post(simpleRoute)
      .attach("file", path.resolve(__dirname, "../../resources/skeleton.jpg"));

    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("simple file upload", async function () {
    // console.log("dirname", __dirname);
    // console.log(path.resolve(__dirname, "../../resources/skeleton.jpg"))

    const response = await httpClient
      .post(simpleRoute)
      .attach("filed", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .set("Connection", "keep-alive");

    console.log(response.body);
    assert.equal(response.status, 400);
  });

  it("multiple file upload, error", async function () {
    // console.log("dirname", __dirname);
    // console.log(path.resolve(__dirname, "../../resources/skeleton.jpg"))

    const response = await httpClient
      .post(multipleRoute)
      .attach("files", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .attach("files", path.resolve(__dirname, "../../resources/skeleton.jpg"));

    // console.log(response.body);
    assert.equal(response.status, 200);
  });
});
