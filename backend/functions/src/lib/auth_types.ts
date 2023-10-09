import {NextFunction, Request, Response} from "express"
import {Feeding, HusbandryRecord, Reptile, Schedule, User} from "../types"

export type HasId = {
  _id: string
}

export type OrError<T> = T | undefined

export type Condition<T extends HasId> = {
  [P in keyof T]?: T[P][] | T[P]
}

export type BasicEndpoints<T extends HasId> = {
  createOne: (item: T) => Promise<OrError<T>>
  findOne: (filter: Condition<T>) => Promise<OrError<T>>
  findMany: (filter: Condition<T>) => Promise<T[]>
  updateOne: (id: string, update: Partial<T>) => Promise<OrError<T>>
  deleteOne: (id: string) => Promise<string>
}

export type DbClient = {
  user: BasicEndpoints<User>
  reptile: BasicEndpoints<Reptile>
  husbandryRecord: BasicEndpoints<HusbandryRecord>
  feeding: BasicEndpoints<Feeding>
  schedule: BasicEndpoints<Schedule>
}

export type JWTBody = {
  userId: string
  reptiles: string[]
  admin: boolean
}

type RequestWithJWTBody = Request & {
  jwtBody?: JWTBody
}

export type AuthReqHandler = {
  (req: RequestWithJWTBody, res: Response, next: NextFunction): void
}

export type ReqBuilder = (client: DbClient) => AuthReqHandler
