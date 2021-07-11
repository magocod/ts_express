import parser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Router } from "express";

/**
 * [handleCors description]
 * @type {function}
 */
export const handleCors = (router: Router): void => {
  router.use(
    cors({
      credentials: true,
      origin: true,
    })
  );
};

/**
 * [handleBodyRequestParsing description]
 * @type {function}
 */
export const handleBodyRequestParsing = (router: Router): void => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

/**
 * [handleCompression description]
 * @type {function}
 */
export const handleCompression = (router: Router): void => {
  router.use(compression());
};
