import { UpdateReptileBody } from "./inputHelpers";
import { isSexType, isString } from "./validationFunctions";

export function getCurrentDateTime() {
  return new Date().toISOString();
}

export function getReptilePartial(body: any): UpdateReptileBody {
  const species = isString(body.species) ? body.species : undefined;
  const name = isString(body.name) ? body.name : undefined;
  const sex = isSexType(body.sex) ? body.sex : undefined;
  return { species, name, sex };
}
