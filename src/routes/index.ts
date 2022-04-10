import { Request, Response, Router, NextFunction } from "express";

import { promises as fs } from "fs";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send(process.env.APP_NAME || "ts_express");
});

routes.get("/test", (req: Request, res: Response) => {
  res.json({ prop: "hello test" });
});

routes.get("/error", (req: Request, res: Response) => {
  JSON.parse("}");
  res.json("hello error");
});

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

export default routes;
