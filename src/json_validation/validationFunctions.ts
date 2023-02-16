import {
  CreateUserBody,
  CreateScheduleBody,
  CreateReptileBody,
  CreateFeedingBody,
  CreateHusbandryBody,
  LoginBody,
} from "../dbQueries/request_types";
import { SexType, SpeciesType, ScheduleType } from "../types";

type KeyType = "string" | "number";
export type RecordMap<T> = Record<keyof T, KeyType>;


export function isString(field: any): field is string {
  return typeof field === "string";
}
function isNumber(field: any): field is number {
  return typeof field === "number";
}
export function isSexType(field: any): field is SexType {
  return field === "male" || field === "female";
}

export function isSpeciesType(field: any): field is SpeciesType {
  return (
    field === "ball_python" ||
    field === "king_snake" ||
    field === "corn_snake" ||
    field === "redtail_boa"
  );
}

export function isScheduleType(field: any): field is ScheduleType {
  return field === "feed" || field === "record" || field === "clean";
}

export function validateInputBody<T>(map: Record<keyof T, KeyType>, body: any) {
  return Object.entries(map).every(([key]) =>
    validateKeyValue(map[key as keyof T], body[key])
  );
}

function validateKeyValue(keyType: KeyType, key: any): boolean {
  if (keyType === "string") return isString(key);
  if (keyType === "number") return isNumber(key);
  return true;
}
