import { isSexType, isString } from "./json_validation/validationFunctions";
import jwt from "jsonwebtoken";
import { UpdateReptileBody } from "./dbQueries/request_types";

export function getCurrentDateTime() {
  return new Date().toISOString();
}

export const creationDates = (() => {
  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  return { createdAt, updatedAt };
})();

export function getReptilePartial(body: any): UpdateReptileBody {
  const species = isString(body.species) ? body.species : undefined;
  const name = isString(body.name) ? body.name : undefined;
  const sex = isSexType(body.sex) ? body.sex : undefined;
  return { species, name, sex };
}

export function createUserToken(id: number) {
  return jwt.sign(
    {
      userId: id,
    },
    // process.env.ENCRYPTION_KEY!!,
    "",
    {
      expiresIn: "10m",
    }
  );
}
