import { applyMiddleware } from "./middleware";

export { applyMiddleware };

export function delay(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
