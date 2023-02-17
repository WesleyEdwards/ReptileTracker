import {
  CreateFeedingBody,
  CreateHusbandryBody,
  CreateReptileBody,
  CreateScheduleBody,
  CreateUserBody,
  LoginBody,
} from "../dbQueries/request_types";
import { ValidationBuilder, validator } from "./validationFunctions";

const createUser: ValidationBuilder<CreateUserBody> = {
  firstName: "string",
  lastName: "string",
  email: "string",
  password: "string",
};

const login: ValidationBuilder<LoginBody> = {
  email: "string",
  password: "string",
};

const createSchedule: ValidationBuilder<CreateScheduleBody> = {
  reptileId: "number",
  type: "schedule",
  description: "string",
  monday: "boolean",
  tuesday: "boolean",
  wednesday: "boolean",
  thursday: "boolean",
  friday: "boolean",
  saturday: "boolean",
  sunday: "boolean",
};

const createReptile: ValidationBuilder<CreateReptileBody> = {
  species: "species",
  name: "string",
  sex: "sex",
};

const createFeeding: ValidationBuilder<CreateFeedingBody> = {
  reptileId: "number",
  foodItem: "string",
};

const createHusbandry: ValidationBuilder<CreateHusbandryBody> = {
  reptileId: "number",
  length: "number",
  weight: "number",
  temperature: "number",
  humidity: "number",
};

export const isCreateUserBody = validator(createUser);
export const isLoginBody = validator(login);
export const isCreateScheduleBody = validator(createSchedule);
export const isCreateReptileBody = validator(createReptile);
export const isCreateFeedingBody = validator(createFeeding);
export const isCreateHusbandryBody = validator(createHusbandry);
