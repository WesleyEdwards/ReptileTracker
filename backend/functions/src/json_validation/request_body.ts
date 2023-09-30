import {DbObject, SchemaType, schemaMap} from "../types"
import {ZodIssue, z} from "zod"

type ParseError = {error: Partial<ZodIssue>}

export function checkValidation<T extends SchemaType>(
  schemaName: T,
  body: any
): DbObject<T> | ParseError {
  const result = schemaMap[schemaName].safeParse(body)

  return result.success
    ? (result.data as DbObject<T>)
    : {error: result.error.issues.at(0) ?? {message: "Unknown error"}}
}

export function checkPartialValidation<T extends SchemaType>(
  schemaName: T,
  body: any
): Partial<DbObject<T>> | ParseError {
  const result = schemaMap[schemaName].partial().safeParse(body)

  return result.success
    ? (result.data as Partial<DbObject<T>>)
    : {error: result.error.issues.at(0) ?? {message: "Unknown error"}}
}

export function checkLoginValidation(
  body: any
): {email: string; password: string} | ParseError {
  const result = z
    .object({
      email: z
        .string({required_error: "Email is required"})
        .email({message: "Invalid email"}),
      password: z.string({required_error: "Password is required"})
    })
    .safeParse(body)

  return result.success
    ? result.data
    : {error: result.error.issues.at(0) ?? {message: "Unknown error"}}
}

export function isParseError(body: any): body is ParseError {
  return "error" in body
}
