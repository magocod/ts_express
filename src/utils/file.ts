import fs, { promises as fsp } from "fs";
import { tmpPath, exampleTmpPath } from "../constants";

export async function tmpInit(): Promise<void> {
  if (!fs.existsSync(tmpPath)) {
    await fsp.mkdir(tmpPath);
  }

  if (!fs.existsSync(exampleTmpPath)) {
    await fsp.mkdir(exampleTmpPath);
  }
}

export function tmpRemove(): Promise<void> {
  return fsp.rm(tmpPath, { recursive: true });
}
