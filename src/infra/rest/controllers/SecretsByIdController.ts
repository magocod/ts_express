import { NextFunction, Request, Response } from "express";
import { UrlId } from "../../../domain/models/UrlId";
import { SecretRetriever } from "../../../domain/services/SecretRetriever";

export class SecretsByIdController {

    constructor(private secretRetriever: SecretRetriever) { }

    retrieveSecret = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const urlId = new UrlId(request.params.urlId);
            const secret = await this.secretRetriever.retrieveSecertByUrlId(urlId);
            response.status(200).json(secret);
        } catch (error) {
            next(error);
        }
    }
}