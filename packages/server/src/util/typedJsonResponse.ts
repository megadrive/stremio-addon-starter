import type { Response } from "express";
export type { Request } from "express";

type Send<ResBody = any, T = Response<ResBody>> = (body?: ResBody) => T;

export interface TypedJsonResponse<T> extends Response<T> {
  json: Send<T, this>;
}
