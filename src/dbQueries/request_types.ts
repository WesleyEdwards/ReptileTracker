import { ScheduleType, SexType, SpeciesType } from "../types";

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

export type UpdateReptileBody = {
  species?: SpeciesType;
  name?: string;
  sex?: string;
};

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
