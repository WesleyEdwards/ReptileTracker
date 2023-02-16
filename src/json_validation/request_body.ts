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
  RecordMap,
  validateInputBody,
} from "./validationFunctions";

export function isCreateUserBody(body: any): body is CreateUserBody {
  const UserBodyMap: RecordMap<CreateUserBody> = {
    firstName: "string",
    lastName: "string",
    email: "string",
    password: "string",
  };
  return validateInputBody(UserBodyMap, body);
}

export function isLoginBody(body: any): body is LoginBody {
  const UserBodyMap: RecordMap<LoginBody> = {
    email: "string",
    password: "string",
  };
  return validateInputBody(UserBodyMap, body);
}

export function isCreateScheduleBody(body: any): body is CreateScheduleBody {
  const CreateScheduleBodyMap: RecordMap<CreateScheduleBody> = {
    reptileId: "number",
    userId: "number",
    type: "string",
    description: "string",
  };
  if (!isScheduleType(body.type)) return false;
  return validateInputBody(CreateScheduleBodyMap, body);
}

export function isCreateReptileBody(body: any): body is CreateReptileBody {
  const CreateReptileBodyMap: RecordMap<CreateReptileBody> = {
    userId: "number",
    species: "string",
    name: "string",
    sex: "string",
  };
  if (!isSexType(body.sex)) return false;
  if (!isSpeciesType(body.species)) return false;
  return validateInputBody(CreateReptileBodyMap, body);
}

export function isCreateFeedingBody(body: any): body is CreateFeedingBody {
  const CreateFeedingBodyMap: RecordMap<CreateFeedingBody> = {
    reptileId: "number",
    foodItem: "string",
  };
  return validateInputBody(CreateFeedingBodyMap, body);
}

export function isCreateHusbandryBody(body: any): body is CreateHusbandryBody {
  const CreateHusbandryBodyMap: RecordMap<CreateHusbandryBody> = {
    reptileId: "number",
    length: "number",
    weight: "number",
    temperature: "number",
    humidity: "number",
  };
  return validateInputBody(CreateHusbandryBodyMap, body);
}
