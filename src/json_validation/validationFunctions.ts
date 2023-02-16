import {
  CreateUserBody,
  CreateScheduleBody,
  CreateReptileBody,
  CreateFeedingBody,
  CreateHusbandryBody,
  LoginBody,
} from "../dbQueries/request_types";
import { SexType, SpeciesType, ScheduleType } from "../types";



export function isString(field: any): field is string {
  return typeof field === "string";
}
export function isNumber(field: any): field is number {
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
