import { Request, Response, Router, NextFunction } from "express";

import { promises as fs } from "fs";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send(process.env.APP_NAME || "ts_express");
});

routes.get("/test", (req: Request, res: Response) => {
  res.json({ prop: "hello test" });
});

// handle sync error, with errorHandler
routes.get("/error", (req: Request, res: Response) => {
  JSON.parse("}");
  res.json("hello error");
});

// handle async error, with errorHandler
routes.get(
  "/next_error",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fs.readFile("/file-does-not-exist");
      res.json("exist");
    } catch (e) {
      next(e);
    }
  }
);

async function exampleHandler(req: Request, res: Response) {
    try {
        await Promise.reject(new Error('fail'))
        return res.json({})
    } catch (err) {
        // console.log(err)
        let message = "...";
        if (err instanceof Error) {
            message = err.message;
        }

        return res.status(400).send({
            message,
            error: message,
        });
    }
}

// handle sync|async error, without errorHandler
routes.get("/suppress_error", exampleHandler);

export default routes;
