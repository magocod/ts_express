import { assert } from "chai";
import app, { ws } from "../src/app";
import supertest from "supertest";
import { Server } from "http";
import { io as Client } from "socket.io-client";

// import { SocketServer } from '../src/socket';
import { SocketClient } from "./helpers";

const httpClient = supertest(app);

const port = 5002;

describe("socket_emit.spec", () => {
  let wsServer: Server;
  // let serverSocket: SocketServer;
  let clientSocket: SocketClient;

  before(function (done) {
    wsServer = ws.server.listen(port, () => {
      console.log(`Ws server is running http://localhost:${port}...`);
      clientSocket = Client(`http://localhost:${port}`);

      // ws.io.on("connection", (socket) => {
      //   console.log("a test user connected");
      //   // serverSocket = socket;
      // });

      clientSocket.on("connect", done);
    });
  });

  after(function() {
    wsServer.close()
    clientSocket.close();
  })

  it("io emit example test", async () => {
    clientSocket.on("some_event", (msg) => {
      // console.log(msg);
      assert.typeOf(msg, 'object')
    });

    const response = await httpClient.get("/socket");

    // console.log(response.body);
    assert.equal(response.status, 200);
  });
});
