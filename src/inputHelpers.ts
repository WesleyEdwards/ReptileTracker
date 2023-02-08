type SexType = "male" | "female";
type KeyType = "string" | "number";

export type CreateUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

export type CreateReptileBody = {
  userId: number;
  species: string;
  name: string;
  sex: SexType;
};

export type UpdateReptileBody = {
  species?: string;
  name?: string;
  sex?: string;
};

export function isCreateUserBody(body: any): body is CreateUserBody {
  const UserBodyMap: Record<keyof CreateUserBody, KeyType> = {
    firstName: "string",
    lastName: "string",
    email: "string",
    passwordHash: "string",
  };
  return Object.entries(UserBodyMap).every(([key, value]) => {
    if (value === "string" && !isString(key)) {
      return false;
    }
    if (value === "number" && !isNumber(key)) {
      return false;
    }
    return key in body;
  });
}

export function isCreateReptileBody(body: any): body is CreateReptileBody {
  const UserBodyMap: Record<keyof CreateReptileBody, KeyType> = {
    userId: "number",
    species: "string",
    name: "string",
    sex: "string",
  };
  if (!isSexType(body.sex)) return false;
  return Object.entries(UserBodyMap).every(([key]) => key in body);
}

export function getReptilePartial(body: any): UpdateReptileBody {
  const species = isString(body.species) ? body.species : undefined;
  const name = isString(body.name) ? body.name : undefined;
  const sex = isSexType(body.sex) ? body.sex : undefined;
  return { species, name, sex };
}

function isString(field: any): field is string {
  return typeof field === "string";
}
function isNumber(field: any): field is number {
  return typeof field === "number";
}
function isSexType(field: any): field is SexType {
  return field === "male" || field === "female";
}
