/**
 * development server
 * warning: do not use in production
 * error: do not include this file in production (use npm run build)
 */

import http from "http";

import app from "./app.export";

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
});

export default server;
