import { NextFunction, Request, Response } from "express";
import { Feeding, HusbandryRecord, Reptile, Schedule, User } from "../types";
import { Filter } from "mongodb";

type HasId = {
  _id: string;
};

export type OrError<T> = T | string;

export function isError<T>(obj: OrError<T>): obj is string {
  return typeof obj === "string";
}

export type KeyAndValue<T extends HasId> = {
  [P in keyof T]?: T[P];
};

export type Condition<T> = {
  [P in keyof T]?: T[P][];
};

export function conditionToFilter<T>(condition: Condition<T>): Filter<T> {
  const filter: Filter<T> = {};
  for (const key in condition) {
    if (condition[key as keyof T]) {
      filter[key as keyof Filter<T>] = {
        $in: condition[key as keyof T],
      };
    }
  }
  return filter;
}

export type BasicEndpoints<T extends HasId> = {
  createOne: (user: T) => Promise<OrError<T>>;
  findOne: (filter: KeyAndValue<T>) => Promise<OrError<T>>;
  findMany: (id: Condition<T>) => Promise<OrError<T[]>>;
  updateOne: (user: Partial<T>) => Promise<OrError<T>>;
  deleteOne: (id: string) => Promise<string>;
};

export type DbClient = {
  user: BasicEndpoints<User>;
  reptile: BasicEndpoints<Reptile>;
  husbandryRecord: BasicEndpoints<HusbandryRecord>;
  feeding: BasicEndpoints<Feeding>;
  schedule: BasicEndpoints<Schedule>;
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
