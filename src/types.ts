import { Request, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

export type SexType = "male" | "female";

export type SpeciesType =
  | "ball_python"
  | "king_snake"
  | "corn_snake"
  | "redtail_boa";

export type ScheduleType = "feed" | "record" | "clean";

export type CreateUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type CreateFeedingBody = {
  reptileId: number;
  foodItem: string;
};

export type CreateHusbandryBody = {
  reptileId: number;
  length: number;
  weight: number;
  temperature: number;
  humidity: number;
};

export type CreateReptileBody = {
  userId: number;
  species: SpeciesType;
  name: string;
  sex: SexType;
};

export type UpdateReptileBody = {
  species?: SpeciesType;
  name?: string;
  sex?: string;
};

export type CreateScheduleBody = {
  reptileId: number;
  userId: number;
  type: ScheduleType;
  description: string;
};

export type JWTBody = {
  userId: number;
};

export type RequestWithJWTBody = Request & {
  jwtBody?: JWTBody;
};

export type LoginBody = {
  email: string;
  password: string;
};

export const emptyScheduleDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export type Route = {
  path: string;
  method: "post" | "put" | "get" | "delete";
  endpointBuilder: (client: PrismaClient) => RequestHandler;
  skipAuth?: boolean;
};
