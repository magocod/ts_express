import { pool } from "../services/queue_pool";
import { poolV2 } from "../services/queue_pool_v2";
import { emailQueue } from "../services/email";

import { queueInfo } from "../queue";

pool.boot();
poolV2.boot();
emailQueue.boot();

pool.resume().catch((error) => {
  console.log(error);
});

poolV2.resume().catch((error) => {
  console.log(error);
});

emailQueue.resume().catch((error) => {
  console.log(error);
});

queueInfo().catch((error) => {
  console.log(error);
});
