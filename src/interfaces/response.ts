import { Response } from "express";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type GenericResponse = Promise<Response<any, Record<string, any>>>;

export interface GenericSuccess<T> {
  message: string;
  data: T;
}

export interface GenericError {
  message: string;
  error: string;
  code?: number;
}
