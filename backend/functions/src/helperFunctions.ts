import { isSexType, isString } from "./json_validation/validationFunctions";
import jwt from "jsonwebtoken";
import { UpdateReptileBody } from "./dbQueries/request_types";
import { v4 as uuidv4 } from "uuid";

export function getCurrentDateTime() {
  return new Date().toISOString();
}

export const creationDates = () => {
  const currDate = getCurrentDateTime();
  return { createdAt: currDate, updatedAt: currDate, _id: uuidv4() };
};

export function getReptilePartial(body: any): UpdateReptileBody {
  const species = isString(body.species) ? body.species : undefined;
  const name = isString(body.name) ? body.name : undefined;
  const sex = isSexType(body.sex) ? body.sex : undefined;
  return { species, name, sex };
}

export function createUserToken(id: string) {
  return jwt.sign({ userId: id }, process.env.ENCRYPTION_KEY!, {
    expiresIn: "10m",
  });
}
