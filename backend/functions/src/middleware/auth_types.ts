import { NextFunction, Response, Request } from "express";

export type JWTBody = {
  userId: number;
};

type RequestWithJWTBody = Request & {
  jwtBody?: JWTBody;
};

export type AuthReqHandler = {
  (req: RequestWithJWTBody, res: Response, next: NextFunction): void;
};

export type DbClient = {
  user: any;
  reptile: any;
  husbandryRecord: any;
  feeding: any;
  schedule: any,
}

export type ReqBuilder = (client: DbClient) => AuthReqHandler;

