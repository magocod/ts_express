import supertest from "supertest";
import server from "../../src/server";
const request = supertest(server);

import { SecretModel } from "../../src/infra/repositories/mongo/SecretModel";

describe("Store and Retrieve Secrets end to end tests", () => {
    beforeAll(async () => {
        await SecretModel.deleteMany({});
    });
    it("should return an error if the secret does not exit", async () => {
        const response = await request.get("/api/v1/secrets/123qweasdmynonexistantsecret");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            name: "SecretNotFoundError",
            message: "Secret was not found in the system"
        });
    });
    it("should return an error when the secret is too short", async () => {
        const response = await request.post("/api/v1/secrets").send({
            secret: "qwe",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "SecretValidationError",
            message: "Secret is too short"
        });
    });

    let urlId: string;
    it("should store a secret in the system", async () => {
        const response = await request.post("/api/v1/secrets").send({
            secret: "mylittlesecret",
        });

        expect(response.status).toBe(201);
        expect(response.body.urlId.length).toBeGreaterThanOrEqual(10);
        urlId = response.body.urlId;
    });
    it("should retrieve that secret from the system", async () => {
        const response = await request.get("/api/v1/secrets/" + urlId);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ secret: "mylittlesecret" });
    });
    it("should return a not found error trying to retrieve the same urlId", async () => {
        const response = await request.get("/api/v1/secrets/" + urlId);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            name: "SecretNotFoundError",
            message: "Secret was not found in the system"
        });
    });
});