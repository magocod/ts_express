import supertest from "supertest";
import { SecretModel } from "../../src/infra/repositories/mongo/SecretModel";
import server from "../../src/server";
const request = supertest(server);
import mongoose from "mongoose";

describe('Get secrets integration tests', () => {
    it('should return an error when the urlId provided is too short', async () => {
        mongoose.connection.readyState = 1;
        const response = await request.get("/api/v1/secrets/2short");

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            name: "UrlIdValidationError",
            message: "UrlId is too short"
        });
    });
    it('should return an error when the secret does not exist in the system', async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        mongoose.connection.readyState = 1;

        const response = await request.get("/api/v1/secrets/123qweasdmynonexistantsecret");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            name: "SecretNotFoundError",
            message: "Secret was not found in the system"
        });
    });
    it('should retrieve a secret from the system', async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue({
            secret: "mySecret",
        });
        SecretModel.deleteOne = jest.fn();
        mongoose.connection.readyState = 1;

        const response = await request.get("/api/v1/secrets/123qweasdmynonexistantsecret");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            secret: "mySecret"
        });
        expect(SecretModel.deleteOne).toBeCalledTimes(1);
        expect(SecretModel.deleteOne).toBeCalledWith({ urlId: "123qweasdmynonexistantsecret" });
    });
    it('should throw a 500 error when unexpected error is thrown', async () => {
        SecretModel.findOne = jest.fn().mockImplementation(async () => {
            throw new Error("Connection refused");
        });
        mongoose.connection.readyState = 1;

        const response = await request.get("/api/v1/secrets/123qweasdmynonexistantsecret");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            name: "InternalServerError",
            message: "Something went wrong"
        });
    });
});
