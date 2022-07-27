import fs, { promises as fsp } from "fs";
import { tmpPathUpload, tmpPathTxt } from "../constants";

export async function tmpInit() {
  if (!fs.existsSync(tmpPathUpload)) {
    await fsp.mkdir(tmpPathUpload);
  }

  if (!fs.existsSync(tmpPathTxt)) {
    await fsp.mkdir(tmpPathTxt);
  }
}
