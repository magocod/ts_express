import http from "http";
import { Server } from "socket.io";
import { Application } from "express";

export function startWs(app: Application) {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      console.log('client: ' + socket.id);
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('some event', (msg) => {
      console.log('client: ' + socket.id);
      console.log('event message: ' + msg);
    });
  });

  // server.listen(3001, () => {
  //   console.log(`Ws server is running http://localhost:${3001}...`);
  // });

  return { io, server }
}
