import { NextFunction, Request, Response } from "express";
import { Feeding, HusbandryRecord, Reptile, Schedule, User } from "../types";
import { Filter, OptionalId } from "mongodb";

type HasId = {
  _id: string;
};

type OrError<T> = T | undefined;

export type Endpoints<T extends HasId> = {
  createOne: (user: OptionalId<T>) => Promise<OrError<T>>;
  findOne: (filter: Filter<T>) => Promise<OrError<T>>;
  findMany: (id: string[]) => Promise<OrError<T[]>>;
  updateOne: (user: T) => Promise<OrError<T>>;
  deleteOne: (id: string) => Promise<OrError<T>>;
};

export type DbClient = {
  user: Endpoints<User>;
  reptile: Endpoints<Reptile>;
  husbandryRecord: Endpoints<HusbandryRecord>;
  feeding: Endpoints<Feeding>;
  schedule: Endpoints<Schedule>;
};

export type JWTBody = {
  userId: string;
};

type RequestWithJWTBody = Request & {
  jwtBody?: JWTBody;
};

export type AuthReqHandler = {
  (req: RequestWithJWTBody, res: Response, next: NextFunction): void;
};

export type ReqBuilder = (client: DbClient) => AuthReqHandler;
