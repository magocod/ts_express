import { Secret } from "../models/Secret";
import { UrlId } from "./UrlId";

export interface SecretRetriever {
    retrieveSecertByUrlId(urlId: UrlId): Promise<Secret>;
}
