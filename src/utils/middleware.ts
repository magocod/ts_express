import { Router } from "express";

export type Wrapper = (router: Router) => void;

/**
 *
 * @param middleware
 * @param router
 */
export const applyMiddleware = (
  middleware: Wrapper[],
  router: Router
): void => {
  for (const f of middleware) {
    f(router);
  }
};
