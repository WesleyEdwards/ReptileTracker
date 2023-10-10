import jwt from "jsonwebtoken"
import {v4 as uuidv4} from "uuid"
import {User} from "../types"
import {JWTBody} from "./auth_types"

export function getCurrentDateTime() {
  return new Date().toISOString()
}

export const creationDates = () => {
  const currDate = getCurrentDateTime()
  return {createdAt: currDate, updatedAt: currDate, _id: uuidv4()}
}

export function createUserToken(jwtBody: JWTBody) {
  return jwt.sign(jwtBody, process.env.ENCRYPTION_KEY!, {
    expiresIn: "60m"
  })
}

export function sendUserBody(user: User): Omit<User, "passwordHash"> {
  const {passwordHash, ...rest} = user
  return rest
}

export function canAccessReptile(body: any, jwtBody?: JWTBody): boolean {
  if (!("reptile" in body)) return true
  if (!jwtBody) return false
  if (jwtBody.admin) return true
  const {reptile} = body
  if (typeof reptile === "string") {
    if (!jwtBody.reptiles.includes(reptile)) return false
  }
  if (Array.isArray(reptile)) {
    if (!reptile.every((r) => jwtBody.reptiles.includes(r))) return false
  }
  return true
}
