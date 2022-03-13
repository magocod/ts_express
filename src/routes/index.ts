import { Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import User from "../entity/User";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(process.env.APP_NAME);
});

router.get("/test", (req: Request, res: Response) => {
  res.json({ prop: "hello test" });
});

router.get("/error", (req: Request, res: Response) => {
  JSON.parse("}");
  res.send("hello error");
});

export default router;
