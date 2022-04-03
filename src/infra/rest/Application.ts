import express from "express";
import { errorHandler } from "./middlewares/ErrorHandler";
import { Route } from "./routes/Route";

export class Application {
    private expressApp: express.Application = express();

    constructor(private routeList: Route[]) {
        this.appConfiguration();
        this.mountRoutes();
    }

    private mountRoutes() {
        this.routeList.forEach(route => route.mountRoute(this.expressApp));
        this.expressApp.use(errorHandler);
    }

    private appConfiguration() {
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: true }));
    }

    getExpressApplication(): express.Application {
        return this.expressApp;
    }
}