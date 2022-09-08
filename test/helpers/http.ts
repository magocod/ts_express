import sinon from "sinon";
import { Response } from "express";

interface StupResponse {
  status?: sinon.SinonStub<unknown[], unknown>;
  json?: sinon.SinonStub<unknown[], unknown>;
}

export function mockExpressResponse() {
  const res: StupResponse = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
}

export function stubExpressResponse() {
  const status = sinon.stub();
  const json = sinon.stub();

  const res = {} as Response;
  res.status = status.returns(res);
  res.json = json.returns(res);

  return {
    status,
    json,
    res,
  };
}
