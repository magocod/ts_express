import app from "./app";
import { startQueue } from "./queue";

import { pool } from "./services/queue_pool";

const ACTIVE_QUEUE = JSON.parse(process.env.ACTIVE_QUEUE as string);

console.log('ACTIVE_QUEUE', ACTIVE_QUEUE);

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
        )
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });

  // init from module function | class service
  pool.multiplyQueue()
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

export = app;
