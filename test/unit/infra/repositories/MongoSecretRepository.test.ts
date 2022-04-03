import mongoose from "mongoose";
import { Secret } from "../../../../src/domain/models/Secret";
import { UrlId } from "../../../../src/domain/models/UrlId";
import { MongoSecretRepository } from "../../../../src/infra/repositories/mongo/MongoSecretRepository";
import { SecretModel } from "../../../../src/infra/repositories/mongo/SecretModel";

describe("MongoSecretRepository Tests", () => {
    it("should connect to the database", () => {
        mongoose.connect = jest.fn();

        new MongoSecretRepository();
        expect(mongoose.connect).toBeCalledTimes(1);
        expect(mongoose.connect).toBeCalledWith("mongodb://localhost:27017/onetimesecretb");
    });
    it("should not connect to the database when connection is already stablished", () => {
        mongoose.connect = jest.fn();
        mongoose.connection.readyState = 1;

        new MongoSecretRepository();
        expect(mongoose.connect).toBeCalledTimes(0);
    });
    it("should return a null object when the secret is not found", async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue(null);
        mongoose.connect = jest.fn();
        mongoose.connection.readyState = 1;

        const urlId = new UrlId("123456rtyree");
        const mongoSecretRepository = new MongoSecretRepository();
        expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toBe(null);
        expect(mongoose.connect).toBeCalledTimes(0);
    });
    it("should return the secret when it is found", async () => {
        SecretModel.findOne = jest.fn().mockResolvedValue({
            secret: "qwseqwe12",
        });
        mongoose.connect = jest.fn();
        mongoose.connection.readyState = 1;

        const urlId = new UrlId("123456rtyree");
        const mongoSecretRepository = new MongoSecretRepository();
        expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toEqual(new Secret("qwseqwe12"));
        expect(mongoose.connect).toBeCalledTimes(0);
        expect(SecretModel.findOne).toBeCalledTimes(1);
        expect(SecretModel.findOne).toBeCalledWith({ urlId: "123456rtyree" });
    });
    it("should remove a secret from the database", async () => {
        SecretModel.deleteOne = jest.fn();
        mongoose.connect = jest.fn();
        mongoose.connection.readyState = 1;

        const urlId = new UrlId("123456rtyree");
        const mongoSecretRepository = new MongoSecretRepository();
        await mongoSecretRepository.removeSecretByUrlId(urlId);
        expect(SecretModel.deleteOne).toBeCalledTimes(1);
        expect(SecretModel.deleteOne).toBeCalledWith({ urlId: "123456rtyree" });
    });
    it("should store urlId and Secret into the database", async () => {
        SecretModel.create = jest.fn();
        mongoose.connect = jest.fn();
        mongoose.connection.readyState = 1;

        const urlId = new UrlId("123456rtyree");
        const secret = new Secret("asd3e324dsas");
        const mongoSecretRepository = new MongoSecretRepository();
        await mongoSecretRepository.storeUrlIdAndSecret(urlId, secret);
        expect(SecretModel.create).toBeCalledTimes(1);
        expect(SecretModel.create).toBeCalledWith({ urlId: "123456rtyree", secret: "asd3e324dsas" });
    });
});
