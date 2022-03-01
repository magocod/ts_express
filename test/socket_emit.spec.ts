import { assert } from "chai";
import app, { ws } from "../src/app.socket";
import supertest from "supertest";
import { Server } from "http";

const httpClient = supertest(app);

const port = 5002;

describe("socket_emit.spec", () => {
  // let wsServer: Server;
  //
  // before(function () {
  //   wsServer = ws.server.listen(port, () => {
  //     console.log(`Ws server is running http://localhost:${port}...`);
  //   });
  // });
  //
  // after(function() {
  //   wsServer.close()
  // })

  it("io emit example test", async () => {
    const response = await httpClient.get("/socket");

    console.log(response.body);
    assert.equal(response.status, 200);
  });
});
