import sinon from "sinon";
import { Response } from "express";

export function mockExpressResponse() {
  const res = {} as Response;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
}
