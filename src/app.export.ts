/**
 * current error in transpiling to ts, when calling application code from bin directory
 * current solution, use another file with export syntax (export = a)
 */

import app from "./app";

// boot services
// ...

export = app;
