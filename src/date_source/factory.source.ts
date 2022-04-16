import { argDataSource } from "./arg.source";
import { mxDataSource } from "./mx.source";
import { DataSource } from "typeorm";

import { CountryId } from "../constants";

export async function initializeAll() {
  if (!argDataSource.isInitialized) {
    await argDataSource.initialize();
  }
  if (!mxDataSource.isInitialized) {
    // await mxDataSource.initialize();
  }
  return { argDs: argDataSource, mxDs: mxDataSource };
}

export async function destroyAll() {
  await argDataSource.destroy();
  await mxDataSource.destroy();
}

export function dataSourceFactory(country_id = CountryId.arg): DataSource {
  if (country_id === CountryId.arg) {
    return argDataSource;
  }

  if (country_id === CountryId.mx) {
    return mxDataSource;
  }

  throw new Error("unknown DataSource");
}
