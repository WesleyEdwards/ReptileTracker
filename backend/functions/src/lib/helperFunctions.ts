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
    expiresIn: "10m"
  })
}

export function sendUserBody(user: User): Omit<User, "passwordHash"> {
  const {passwordHash, ...rest} = user
  return rest
}
