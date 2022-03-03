/**
 * development server
 * warning: do not use in production
 * error: do not include this file in production (use npm run build)
 */

// import express from "express";
import http from "http";

import app from "./app";

import { startQueue } from "./queue";

const { PORT = 3000 } = process.env;
const server = http.createServer(app);

// app.use('/', routes);

server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
});

startQueue()
  .then(({ sumQueue }) => {
    sumQueue.add(
      {
        a: 10,
        b: 5,
      },
      {
        repeat: {
          cron: "* * * * * *",
        },
      }
    );
  })
  .catch((error) => {
    console.log(error);
  });

export default server;
