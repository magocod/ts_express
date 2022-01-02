import { Response } from "express";

export type GenericResponse = Promise<
  Response<unknown, Record<string, unknown>> | undefined
>;
