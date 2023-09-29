import { Feeding, Reptile, ScheduleType, SexType, SpeciesType } from "../types";

export type CreateUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type CreateFeedingBody = {
  foodItem: string;
};

export type CreateHusbandryBody = {
  reptile: string;
  length: number;
  weight: number;
  temperature: number;
  humidity: number;
};

export type CreateReptileBody = {
  species: SpeciesType;
  name: string;
  sex: SexType;
};

export type Updatable<T extends { _id: string }, K extends keyof T> = Omit<
  {
    [P in keyof T]?: T[P];
  },
  "_id" | "createdAt" | "updatedAt" | K
>;

export type UpdateReptileBody = Updatable<Reptile, "user" | "sex" | "species">;
export type UpdateFeedingBody = Updatable<Feeding, "reptile">;

export type CreateScheduleBody = {
  type: ScheduleType;
  description: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export type LoginBody = {
  email: string;
  password: string;
};
