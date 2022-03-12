import { pool } from "../services/queue_pool";
import { poolV2 } from "../services/queue_pool_v2";

import { queueClean } from "../queue";

// failed
// QueuePool.closeAll()
//   .then(() => {
//     console.log("queues closes");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// not close database
// QueuePool.multiplyQueue()
//   .removeRepeatable({
//     cron: "* * * * * *",
//   })
//   .then(() => {
//     console.log("queue remove repeatable");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// not close database
// QueuePool.removeAllRepeatable()
//   .then(() => {
//     console.log("queues repeatables remove");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

pool.boot()
poolV2.boot()

pool.clean()
  .then(() => {
    console.log("queues closes");
  })
  .catch((error) => {
    console.log(error);
  });

poolV2.clean().catch((error) => {
  console.log(error);
});

queueClean().catch((error) => {
  console.log(error);
});
