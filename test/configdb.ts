import { Connection, createConnection, getConnection } from "typeorm";

/**
 * @deprecated use app factory
 */
export async function checkConnection(): Promise<Connection> {
  try {
    // default
    return getConnection();
  } catch (e) {
    return createConnection();
  }
}
