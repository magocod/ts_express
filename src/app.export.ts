import app from "./app";
import { startQueue } from "./queue";

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

export = app;
