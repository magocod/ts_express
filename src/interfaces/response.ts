import { Response } from "express";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type GenericResponse = Promise<Response<any, Record<string, any>>>;

export interface ResponseLocalUser {
  id: number;
  email: string;
}
