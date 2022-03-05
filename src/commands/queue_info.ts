import QueuePool from "../services/queue_pool";

import { queueInfo } from "../queue";

QueuePool.resume().catch((error) => {
  console.log(error);
});

queueInfo().catch((error) => {
  console.log(error);
});
