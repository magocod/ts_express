import { Request, Response, Router } from "express";

import { ws } from "../app";

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
    someProperty: "all sockets",
    otherProperty: "other value",
  }); // This will emit the event to all connected sockets
  res.json({ message: "socket_send", data: result });
});

routes.get("/send_to_socket", async (req: Request, res: Response) => {
  try {
    const sockets = await ws.io.fetchSockets();
    const socket = sockets.find((s) => {
      return s.data.user_id === req.body.user_id;
    });

    // console.log(socket);
    if (socket === undefined) {
      return res.status(400).json({ error: "socket = undefined" });
    }

    const result = ws.io.to(socket.id).emit("only_event", {
      someProperty:
        "only this socket: " + socket.data.user_id + ", " + socket.id,
    });
    return res.json({ message: "socket_send", data: result });
  } catch (e) {
    console.log(e);
    return res.status(400).json({});
  }
});

export default routes;
