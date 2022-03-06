import { pool } from "../services/queue_pool";
import { emailQueue } from "../services/email";

import { queueInfo } from "../queue";

pool.boot();
emailQueue.boot();

pool.resume().catch((error) => {
  console.log(error);
});

emailQueue.resume().catch((error) => {
  console.log(error);
});

queueInfo().catch((error) => {
  console.log(error);
});
