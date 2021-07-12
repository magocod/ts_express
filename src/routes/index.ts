/**
 *
 */
import { Request, Response, Router } from "express";
import auth from "./auth";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send(process.env.APP_NAME);
});

routes.get("/test", (req: Request, res: Response) => {
  res.send("hello test");
});

routes.get("/error", (req: Request, res: Response) => {
  JSON.parse("}");
  res.send("hello error");
});

routes.use("/auth", auth);

export default routes;
