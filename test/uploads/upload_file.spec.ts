import { assert } from "chai";
import app from "../../src/app";
import supertest from "supertest";
import path from "path";

const httpClient = supertest(app);

const baseRoute = "/uploads";

const simpleRoute = `${baseRoute}/simple`;
const multipleRoute = `${baseRoute}/multiple`;
const multipleRouteB = `${baseRoute}/txt_multiple`;

describe("upload_files", function () {
  it("simple file upload", async function () {
    // console.log("dirname", __dirname);
    // console.log(path.resolve(__dirname, "../../resources/skeleton.jpg"))

    const response = await httpClient
      .post(simpleRoute)
      .attach("file", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .set("Connection", "keep-alive");

    // console.log(response.body);
    assert.equal(response.status, 200);
  });

  it("simple file upload, error", async function () {
    const response = await httpClient
      .post(simpleRoute)
      .attach("filed", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .set("Connection", "keep-alive");

    console.log(response.body);
    assert.equal(response.status, 400);
  });

  it("multiple file upload", async function () {
    const response = await httpClient
      .post(multipleRoute)
      .attach("files", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .attach("files", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .set("Connection", "keep-alive");

    // console.log(response.body);
    assert.equal(response.status, 200);
  })

  it("multiple file upload, error", async function () {
    // console.log(path.resolve(__dirname, "../../resources/skeleton.jpg"));
    const response = await httpClient
      .post(multipleRoute)
      .attach("files", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .attach("filess", path.resolve(__dirname, "../../resources/skeleton.jpg"))
      .set("Connection", "keep-alive");

    console.log(response.body);
    assert.equal(response.status, 500);
  });

  it("multiple file upload, another storage", async function () {
    const response = await httpClient
      .post(multipleRouteB)
      .attach("files", path.resolve(__dirname, "../../resources/example.txt"))
      .attach("files", path.resolve(__dirname, "../../resources/example.txt"))
      .set("Connection", "keep-alive");

    // console.log(response.body);
    assert.equal(response.status, 200);
  });
});
