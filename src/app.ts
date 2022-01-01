/**
 * App express instance initialization
 */

import { syncCreateApp } from "./factory";

const app = syncCreateApp();

// export default app;
module.exports = app;
