import { request, Request, response, Response } from "express";
import { SecretNotFoundError } from "../../../../../src/domain/errors/SecretNotFoundError";
import { SecretRetriever } from "../../../../../src/domain/services/SecretRetriever";
import { UrlIdValidationError } from "../../../../../src/domain/errors/UrlIdValidationError";
import { UrlId } from "../../../../../src/domain/models/UrlId";
import { Secret } from "../../../../../src/domain/models/Secret";
import { SecretsByIdController } from "../../../../../src/infra/rest/controllers/SecretsByIdController";

describe("SecretsByIdController Tests", () => {
    it("should throw an error if the urlId is too short", () => {
        const req: Request = expect.any(request);
        req.params = { urlId: "tyu12" }
        const res: Response = expect.any(response);
        const next = jest.fn();

        const secretRetriever: SecretRetriever = {
            retrieveSecertByUrlId: jest.fn(),
        }

        const secretsByIdController = new SecretsByIdController(secretRetriever);
        secretsByIdController.retrieveSecret(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new UrlIdValidationError("UrlId is too short"));
        expect(secretRetriever.retrieveSecertByUrlId).toBeCalledTimes(0);
    });
    it("should throw an error if the secret was not found", async () => {
        const req: Request = expect.any(request);
        req.params = { urlId: "tyu12asdasdasdasd" }
        const res: Response = expect.any(response);
        const next = jest.fn();

        const secretRetriever: SecretRetriever = {
            retrieveSecertByUrlId: jest.fn().mockImplementation(async () => {
                throw new SecretNotFoundError();
            }),
        }
        const secretsByIdController = new SecretsByIdController(secretRetriever);
        await secretsByIdController.retrieveSecret(req, res, next);

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new SecretNotFoundError());
        expect(secretRetriever.retrieveSecertByUrlId).toBeCalledTimes(1);
        expect(secretRetriever.retrieveSecertByUrlId).toBeCalledWith(new UrlId("tyu12asdasdasdasd"));
    });
    it("should respond with a secret when it is found", async () => {
        const req: Request = expect.any(request);
        req.params = { urlId: "tyu12asdasdasdasd" }
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const next = jest.fn();

        const secretRetriever: SecretRetriever = {
            retrieveSecertByUrlId: jest.fn().mockResolvedValue(new Secret("asdasdkhj12"))
        }
        const secretsByIdController = new SecretsByIdController(secretRetriever);
        await secretsByIdController.retrieveSecret(req, res, next);

        expect(next).toBeCalledTimes(0);
        expect(secretRetriever.retrieveSecertByUrlId).toBeCalledTimes(1);
        expect(secretRetriever.retrieveSecertByUrlId).toBeCalledWith(new UrlId("tyu12asdasdasdasd"));
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({ secret: "asdasdkhj12" });
    });
});