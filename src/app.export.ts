import app, { ws } from "./app.socket";

ws.server.listen(3001, () => {
  console.log(`Ws server is running http://localhost:${3001}...`);
});

export = app;
