import { isString, isNumber } from "./validationFunctions";

export type KeyType = "string" | "number";

export type ValidationBuilder<T> = {
  recordMap: Record<keyof T, KeyType>;
  additional?: Record<string, (body: any) => boolean>;
};

export const validator =
  <T>(builder: ValidationBuilder<T>) =>
  (body: any): body is T => {
    if (builder.additional) {
      const additionalValidations = Object.entries(builder.additional).every(
        ([key, func]) => func(body[key])
      );
      if (!additionalValidations) return false;
    }
    return validateInputBody(builder.recordMap, body);
  };

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
