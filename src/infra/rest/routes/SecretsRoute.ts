import { Application } from "express";
import { SecretsController } from "../controllers/SecretsController";
import { Route } from "./Route";

export class SecretsRoute implements Route {
    constructor(private secretsController: SecretsController) { }

    mountRoute(application: Application): void {
        application.route("/api/v1/secrets").post(this.secretsController.storeSecret);
    }

}