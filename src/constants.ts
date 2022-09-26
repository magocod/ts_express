import path from "path";

export const tmpPath = path.resolve(__dirname, "../tmp");

export const exampleTmpPath = path.join(tmpPath, "example");

// testing require cache
export const counterServicePath = path.resolve(__dirname, "./services/counter.service.ts");
