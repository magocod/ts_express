import { Response } from "express";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type GenericResponse = Promise<Response<any, Record<string, any>>>;

export type ExpressResponse = Promise<
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  Response<any, Record<string, any>> | undefined | void
>;
