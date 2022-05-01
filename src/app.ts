/**
 * app with export default syntax
 */

import { createApp } from "./app.factory";

const app = createApp();

export default app;

// error to transpile to js
// remove this in favor of app.export.ts
// module.exports = app;
