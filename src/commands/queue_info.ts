import { pool } from "../services/queue_pool";

import { queueInfo } from "../queue";

pool.boot()

pool.resume().catch((error) => {
  console.log(error);
});

queueInfo().catch((error) => {
  console.log(error);
});
