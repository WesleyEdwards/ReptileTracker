import { PrismaClient } from "@prisma/client";
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

export type ReqBuilder = (client: PrismaClient) => AuthReqHandler;
