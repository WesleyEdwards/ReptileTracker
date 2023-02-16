import { SexType, SpeciesType, ScheduleType } from "../types";

type ValidFunctionTypes = "string" | "number" | "species" | "sex" | "schedule";

export type ValidationBuilder<T> = Record<keyof T, ValidFunctionTypes>;

const validFunctions: Record<ValidFunctionTypes, (body: any) => boolean> = {
  string: isString,
  number: isNumber,
  species: isSpeciesType,
  sex: isSexType,
  schedule: isScheduleType,
};

export const validator =
  <T>(validationSchema: ValidationBuilder<T>) =>
  (body: any): body is T => {
    return Object.entries(validationSchema).every(([key, func]) =>
      validFunctions[func as ValidFunctionTypes](body[key])
    );
  };

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
