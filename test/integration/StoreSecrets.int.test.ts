import supertest from "supertest";
import server from "../../src/server";
const request = supertest(server);
import mongoose from "mongoose";
import { SecretModel } from "../../src/infra/repositories/mongo/SecretModel";

describe("Store secrets integration tests", () => {
    it("should return an error if the body is not present in the request", async () => {
        mongoose.connection.readyState = 1;
        const response = await request.post("/api/v1/secrets");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "RequestValidationError",
            message: "Request body format is not valid"
        });
    });
    it("should return an error if the body does not have a secret", async () => {
        mongoose.connection.readyState = 1;
        const response = await request.post("/api/v1/secrets").send({
            hello: "hi!"
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "RequestValidationError",
            message: "Request body format is not valid"
        });
    });
    it("should return an error if the secret is not a string", async () => {
        mongoose.connection.readyState = 1;
        const response = await request.post("/api/v1/secrets").send({
            secret: 123455667787
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "RequestValidationError",
            message: "Secret is not a string"
        });
    });
    it("should return an error if the secret is too short", async () => {
        mongoose.connection.readyState = 1;
        const response = await request.post("/api/v1/secrets").send({
            secret: "22"
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "SecretValidationError",
            message: "Secret is too short"
        });
    });
    it("should store a secret and return the urlId", async () => {
        SecretModel.create = jest.fn();
        mongoose.connection.readyState = 1;
        const response = await request.post("/api/v1/secrets").send({
            secret: "myvalidsecret22"
        });

        expect(response.status).toBe(201);
        expect(response.body.urlId.length).toBeGreaterThanOrEqual(10);
    });
    it("should return an unhandled exception error", async () => {
        SecretModel.create = jest.fn().mockImplementation(async () => {
            throw new Error("Sever memory is full");
        });
        mongoose.connection.readyState = 1;
        const response = await request.post("/api/v1/secrets").send({
            secret: "myvalidsecret22"
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            name: "InternalServerError",
            message: "Something went wrong",
        });
    });
});
