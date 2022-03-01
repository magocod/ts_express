/**
 * development server
 * warning: do not use in production
 * error: do not include this file in production (use npm run build)
 */

// import express from "express";
import http from "http";

import app, { ws } from "./app.socket";

const { PORT = 3000 } = process.env;
const server = http.createServer(app);

ws.server.listen(3001, () => {
  console.log(`Ws server is running http://localhost:${3001}...`);
});

server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
});

export default server;
