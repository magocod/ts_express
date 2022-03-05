/**
 * development server
 * warning: do not use in production
 * error: do not include this file in production (use npm run build)
 */

// import express from "express";
import http from "http";

import app from "./app";

import QueuePool from "./services/queue_pool";

import { startQueue } from "./queue";

const PORT = process.env.PORT;
const ACTIVE_QUEUE = JSON.parse(process.env.ACTIVE_QUEUE as string);
const server = http.createServer(app);

// console.log(PORT);
console.log('ACTIVE_QUEUE', ACTIVE_QUEUE);

server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
});

if (ACTIVE_QUEUE) {
  console.log("start queues");

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
        ).then((job) => {
          // console.log(job)
      })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });

  // init from module function | class service
  QueuePool.multiplyQueue()
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
} else {
  console.log("queues disabled");
}

export default server;
