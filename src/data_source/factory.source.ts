import { argDataSource } from "./arg.source";
import { mxDataSource } from "./mx.source";
import { DataSource, Repository, EntityTarget, Entity } from "typeorm";

import { CountryId } from "../constants";

export interface DataSourceGroup {
  argDs: DataSource;
  mxDs: DataSource;
}

export async function initializeAll(): Promise<DataSourceGroup> {
  if (!argDataSource.isInitialized) {
    await argDataSource.initialize();
  }
  if (!mxDataSource.isInitialized) {
    await mxDataSource.initialize();
  }
  return { argDs: argDataSource, mxDs: mxDataSource };
}

export async function destroyAll(dataSources: DataSource[]) {
  for (const ds of dataSources) {
    await ds.destroy();
  }
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

export function repositoryFactory<T>(
  entity: EntityTarget<T>,
  country_id = CountryId.arg,
): Repository<T> {
  return dataSourceFactory(country_id).getRepository(entity);
}
