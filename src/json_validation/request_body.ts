import {
  CreateFeedingBody,
  CreateHusbandryBody,
  CreateReptileBody,
  CreateScheduleBody,
  CreateUserBody,
  LoginBody,
} from "../dbQueries/request_types";
import {
  isScheduleType,
  isSexType,
  isSpeciesType,
} from "./validationFunctions";
import { ValidationBuilder, validator } from "./validation_builder";

const createUserValidation: ValidationBuilder<CreateUserBody> = {
  recordMap: {
    firstName: "string",
    lastName: "string",
    email: "string",
    password: "string",
  },
};

const loginValidation: ValidationBuilder<LoginBody> = {
  recordMap: {
    email: "string",
    password: "string",
  },
  additional: {
    isEmail: (body) => body.email.includes("@"),
  },
};

const createScheduleValidation: ValidationBuilder<CreateScheduleBody> = {
  recordMap: {
    reptileId: "number",
    userId: "number",
    type: "string",
    description: "string",
  },
  additional: {
    isScheduleType: (body) => isScheduleType(body.type),
  },
};

const createReptileValidation: ValidationBuilder<CreateReptileBody> = {
  recordMap: {
    userId: "number",
    species: "string",
    name: "string",
    sex: "string",
  },
  additional: {
    isSpecies: (body) => isSpeciesType(body.species),
    isSexType: (body) => isSexType(body.sex),
  },
};

const createFeedingValidation: ValidationBuilder<CreateFeedingBody> = {
  recordMap: {
    reptileId: "number",
    foodItem: "string",
  },
};

const createHusbandryValidation: ValidationBuilder<CreateHusbandryBody> = {
  recordMap: {
    reptileId: "number",
    length: "number",
    weight: "number",
    temperature: "number",
    humidity: "number",
  },
};

export const isCreateUserBody = validator(createUserValidation);
export const isLoginBody = validator(loginValidation);
export const isCreateScheduleBody = validator(createScheduleValidation);
export const isCreateReptileBody = validator(createReptileValidation);
export const isCreateFeedingBody = validator(createFeedingValidation);
export const isCreateHusbandryBody = validator(createHusbandryValidation);
