/**
 * development server
 * warning: do not use in production
 * error: do not include this file in production (use npm run build)
 */

// import express from "express";
import http from "http";

import app, { ws } from "./app";

import { pool } from "./services/queue_pool";
import { emailQueue } from "./services/email";

import { startQueue } from "./queue";

const PORT = process.env.PORT;
const WS_PORT = process.env.WS_PORT;

const ACTIVE_QUEUE = JSON.parse(process.env.ACTIVE_QUEUE as string);
const ACTIVE_REPEATABLE_QUEUE = JSON.parse(
  process.env.ACTIVE_REPEATABLE_QUEUE as string
);

const server = http.createServer(app);

// console.log(PORT);
console.log("ACTIVE_QUEUE", ACTIVE_QUEUE);
console.log("ACTIVE_REPEATABLE_QUEUE", ACTIVE_REPEATABLE_QUEUE);

ws.server.listen(WS_PORT, () => {
  console.log(`Ws server is running http://localhost:${WS_PORT}...`);
});

server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
});

if (ACTIVE_QUEUE) {
  console.log("start queues");

  // boot queues
  pool.boot();
  emailQueue.boot();

  if (ACTIVE_REPEATABLE_QUEUE) {
    // init from function
    startQueue()
      .then(({ sumQueue }) => {
        sumQueue
          .add(
            {
              a: 10,
              b: 5,
            },
            {
              repeat: {
                cron: "* * * * * *",
              },
            }
          )
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    // init from module function | class service
    pool
      .multiplyQueue()
      .add(
        {
          c: 10,
          d: 5,
        },
        {
          repeat: {
            cron: "* * * * * *",
          },
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }
} else {
  console.log("queues disabled");
}

export default server;
