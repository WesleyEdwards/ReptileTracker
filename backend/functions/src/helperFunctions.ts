import jwt from "jsonwebtoken"
import {v4 as uuidv4} from "uuid"

export function getCurrentDateTime() {
  return new Date().toISOString()
}

export const creationDates = () => {
  const currDate = getCurrentDateTime()
  return {createdAt: currDate, updatedAt: currDate, _id: uuidv4()}
}

export function createUserToken(id: string) {
  return jwt.sign({userId: id}, process.env.ENCRYPTION_KEY!, {
    expiresIn: "10m"
  })
}
