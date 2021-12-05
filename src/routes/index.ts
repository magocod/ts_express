/**
 *
 */
import { Request, Response, Router } from "express";
import auth from "./auth";
import transaction from "./transaction";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send(process.env.APP_NAME);
});

routes.get("/test", (req: Request, res: Response) => {
  res.json({ prop: "hello test" });
});

routes.get("/error", (req: Request, res: Response) => {
  JSON.parse("}");
  res.send("hello error");
});

routes.use("/auth", auth);
routes.use("/transactions", transaction);

export default routes;
