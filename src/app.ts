/**
 * App express instance initialization
 */

import { syncCreateApp } from "./factory";

const app = syncCreateApp();

export default app;

// error to transpile to js
// remove this in favor of app.export.ts
// module.exports = app;
