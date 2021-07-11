/**
 * development server
 * warning: do not use in production
 * error: do not include this file in production (use npm run build)
 */

// import express from "express";
import http from "http";

import app from "./app.es6";

// start instance for tests
// import middleware from './middleware';
// import routes from './routes/index';
// import { applyMiddleware } from './utils';

// // express instance
// const app = express();

// // middleware
// applyMiddleware(middleware, app);

// // routes
// app.use('/', routes);

const { PORT = 3000 } = process.env;
const server = http.createServer(app);

// app.use('/', routes);

server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}...`);
});

export default server;
