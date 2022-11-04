export * from "./file";
export * from "./errorhandler";
export * from "./pagination";
export * from "./logger";

export function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
