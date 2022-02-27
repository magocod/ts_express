import { assert } from "chai";
import app from "../src/app";
import supertest from "supertest";

const httpClient = supertest(app);

const baseRequest = "/auth";

describe("request_validator", () => {
  it("login, valid form", async () => {
    const response = await supertest(app).post(`${baseRequest}/login`).send({
      username: "a@mail.com",
      password: "12345",
    });
    console.log(response.body);

    assert.equal(response.status, 200);
  });

  it("login, invalid form", async () => {
    const response = await supertest(app).post(`${baseRequest}/login`);
    console.log(response.body);

    assert.equal(response.status, 422);
  });

  it("logout", async () => {
    const response = await httpClient.post(`${baseRequest}/logout`);
    console.log(response.body);

    assert.equal(response.status, 200);
  });
});
