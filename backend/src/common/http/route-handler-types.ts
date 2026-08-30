import { RequestHandler } from "express";
import { ApiRequestBody } from "./api-types.js";

type GetAllHandler<QueryParams = {}> = RequestHandler<
  unknown,
  unknown,
  unknown,
  QueryParams
>;

type GetByIdHandler<Params = { id: string }, QueryParams = {}> = RequestHandler<
  Params,
  unknown,
  unknown,
  QueryParams
>;

type PostHandler<Body = unknown> = RequestHandler<
  unknown,
  unknown,
  ApiRequestBody<Body>,
  unknown
>;

type PatchHandler<Params = { id: string }, Body = unknown> = RequestHandler<
  Params,
  unknown,
  ApiRequestBody<Body>,
  unknown
>;

type DeleteHandler<Params = { id: string }> = RequestHandler<
  Params,
  unknown,
  unknown,
  unknown
>;

export {
  GetAllHandler,
  GetByIdHandler,
  PostHandler,
  PatchHandler,
  DeleteHandler,
};
