import QueuePool from "../services/queue_pool";

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

QueuePool.clean()
  .then(() => {
    console.log("queues closes");
  })
  .catch((error) => {
    console.log(error);
  });

queueClean().catch((error) => {
  console.log(error);
});
