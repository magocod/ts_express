import { SecretNotFoundError } from "../errors/SecretNotFoundError";
import { Secret } from "../models/Secret";
import { SecretRepository } from "../../infra/repositories/SecretRepository";
import { SecretRetriever } from "./SecretRetriever";

export class OneTimeSecretRetriever implements SecretRetriever {
    constructor(private secretRepository: SecretRepository) { }

    async retrieveSecertByUrlId(urlId: any): Promise<Secret> {
        const secret = await this.secretRepository.getSecretByUrlId(urlId);
        if (secret === null) throw new SecretNotFoundError();
        await this.secretRepository.removeSecretByUrlId(urlId);
        return secret;
    }
}
