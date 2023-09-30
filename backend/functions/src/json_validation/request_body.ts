import {DbObject, SchemaType, schemaMap} from "../types"
import {z} from "zod"

export function checkValidation<T extends SchemaType>(
  schemaName: T,
  body: any
): DbObject<T> {
  return schemaMap[schemaName].parse(body) as DbObject<T>
}

export function checkPartialValidation<T extends SchemaType>(
  schemaName: T,
  body: any
): Partial<DbObject<T>> {
  return schemaMap[schemaName].partial().parse(body) as Partial<DbObject<T>>
}

export function checkLoginValidation(body: any) {
  const result = z
    .object({
      email: z
        .string({required_error: "Email is required"})
        .email({message: "Invalid email"}),
      password: z.string({required_error: "Password is required"})
    })
    .safeParse(body)
  if (!result.success) {
    throw new Error("Error logging in")
  }
  return result.data
}
