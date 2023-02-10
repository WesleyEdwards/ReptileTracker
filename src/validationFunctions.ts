import {
  CreateReptileBody,
  CreateScheduleBody,
  CreateUserBody,
  UpdateReptileBody,
  SexType,
  SpeciesType,
  ScheduleType,
} from "./inputHelpers";

export type KeyType = "string" | "number";

export function isCreateUserBody(body: any): body is CreateUserBody {
  const UserBodyMap: Record<keyof CreateUserBody, KeyType> = {
    firstName: "string",
    lastName: "string",
    email: "string",
    passwordHash: "string",
  };
  return validateInputBody(UserBodyMap, body);
}

export function isCreateScheduleBody(body: any): body is CreateScheduleBody {
  const CreateScheduleBodyMap: Record<keyof CreateScheduleBody, KeyType> = {
    reptileId: "number",
    userId: "number",
    type: "string",
    description: "string",
  };
  if (!isScheduleType(body.type)) return false;
  return validateInputBody(CreateScheduleBodyMap, body);
}

export function isCreateReptileBody(body: any): body is CreateReptileBody {
  const CreateReptileBodyMap: Record<keyof CreateReptileBody, KeyType> = {
    userId: "number",
    species: "string",
    name: "string",
    sex: "string",
  };
  if (!isSexType(body.sex)) return false;
  if (!isSpeciesType(body.species)) return false;
  return validateInputBody(CreateReptileBodyMap, body);
}

export function isString(field: any): field is string {
  return typeof field === "string";
}
function isNumber(field: any): field is number {
  return typeof field === "number";
}
export function isSexType(field: any): field is SexType {
  return field === "male" || field === "female";
}

function isSpeciesType(field: any): field is SpeciesType {
  return (
    field === "ball_python" ||
    field === "king_snake" ||
    field === "corn_snake" ||
    field === "redtail_boa"
  );
}

function isScheduleType(field: any): field is ScheduleType {
  return field === "feed" || field === "record" || field === "clean";
}

function validateInputBody<T>(map: Record<keyof T, KeyType>, body: any) {
  return Object.entries(map).every(([key]) =>
    validateKeyValue(map[key as keyof T], body[key])
  );
}

function validateKeyValue(keyType: KeyType, key: any): boolean {
  if (keyType === "string") return isString(key);
  if (keyType === "number") return isNumber(key);
  return true;
}
