import http from "http";
import { Server } from "socket.io";
import { Application } from "express";

interface GlobalEvents {
  chat_message: (msg: string) => void;
}

export interface ServerToClientEvents extends GlobalEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  some_event: (msg: { someProperty: string; otherProperty: string }) => void;
}

export interface ClientToServerEvents extends GlobalEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export type IoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export function startWs(app: Application): {
  io: IoServer;
  server: http.Server;
} {
  const server = http.createServer(app);

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat_message", (msg) => {
      console.log("client: " + socket.id);
      console.log("message: " + msg);
      io.emit("chat_message", msg);
    });

    // socket.on("some_event", (msg) => {
    //   console.log("client: " + socket.id);
    //   console.log("event message: " + msg);
    // });
  });

  // server.listen(3001, () => {
  //   console.log(`Ws server is running http://localhost:${3001}...`);
  // });

  return { io, server };
}
