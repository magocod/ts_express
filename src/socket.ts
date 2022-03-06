import http from "http";
import { Server, Socket } from "socket.io";
import { Application } from "express";

import { GenericSuccess, GenericError } from "./interfaces";

interface GlobalEvents {
  chat_message: (msg: string) => void;
}

export interface ServerToClientEvents extends GlobalEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  some_event: (msg: { someProperty: string; otherProperty: string }) => void;
  // all socket
  minus_queue_completed: (result: GenericSuccess<number>) => void;
  minus_queue_failed: (error: GenericError) => void;
  // selected socket
  only_event: (msg: { someProperty: string; }) => void;
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
  user_id: number;
}

export type IoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketServer = Socket<
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

  io.on("connection", async (socket) => {
    console.log("a user connected, socket id:", socket.id);
    const token = socket.handshake.auth.token;
    console.log("token", token);
    socket.data.user_id = token;

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

  // don't start the server from here
  // server.listen(3001, () => {
  //   console.log(`Ws server is running http://localhost:${3001}...`);
  // });

  return { io, server };
}
