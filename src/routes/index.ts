import { Request, Response, Router } from "express";

import { ws } from "../app.socket";

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

routes.get("/socket", (req: Request, res: Response) => {
  const result = ws.io.emit("some_event", {
    someProperty: "some value",
    otherProperty: "other value",
  }); // This will emit the event to all connected sockets
  res.json({ message: "socket_send", data: result });
});

export default routes;
