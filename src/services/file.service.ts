import fs, { promises as fsp } from "fs";
import { tmpPath, tmpPathUpload, tmpPathTxt } from "../constants";

export async function tmpInit() {
  if (!fs.existsSync(tmpPath)) {
    await fsp.mkdir(tmpPath);
  }

  if (!fs.existsSync(tmpPathUpload)) {
    await fsp.mkdir(tmpPathUpload);
  }

  if (!fs.existsSync(tmpPathTxt)) {
    await fsp.mkdir(tmpPathTxt);
  }
}
