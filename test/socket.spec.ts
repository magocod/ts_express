// with { "type": "module" } in your package.json
import { createServer } from "http";
import { io as Client, Socket } from "socket.io-client";
import { Server, Socket as ServerSocket } from "socket.io";
import { assert } from "chai";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// with { "type": "commonjs" } in your package.json
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const Client = require("socket.io-client");
// const assert = require("chai").assert;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type IoServer = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type SocketServer = ServerSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

const port = 5001

describe("socket", () => {
  let io: IoServer;
  let serverSocket: SocketServer;
  let clientSocket: Socket;

  before((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);

    httpServer.listen(port,() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  after(() => {
    io.close();
    clientSocket.close();
  });

  it("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      assert.equal(arg, "world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  it("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg: unknown) => {
      assert.equal(arg, "hola");
      done();
    });
  });
});
