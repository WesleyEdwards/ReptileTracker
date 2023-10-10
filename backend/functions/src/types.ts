import {v4 as uuidv4} from "uuid"
import {z} from "zod"

enum SpeciesType {
  ball_python = "ball_python",
  king_snake = "king_snake",
  corn_snake = "corn_snake",
  redtail_boa = "redtail_boa"
}

enum SexType {
  male = "male",
  female = "female"
}

enum ScheduleType {
  feed = "feed",
  record = "record",
  clean = "clean"
}

const baseObjectSchema = z.object({
  _id: z.string().default(uuidv4),
  createdAt: z.string().default(new Date().toISOString()),
  updatedAt: z.string().default(new Date().toISOString())
})

const userSchema = z
  .object({
    firstName: z.string({required_error: "First name is required"}),
    lastName: z.string({required_error: "Last name is required"}),
    email: z
      .string({required_error: "Email is required"})
      .email({message: "Invalid email"}),
    passwordHash: z.string(),
    admin: z.boolean().default(false)
  })
  .merge(baseObjectSchema)

const reptileSchema = z
  .object({
    user: z.string(),
    species: z.nativeEnum(SpeciesType),
    name: z.string(),
    sex: z.nativeEnum(SexType),
    feeding: z.array(z.string()).default([]),
    husbandryRecord: z.array(z.string()).default([]),
    schedule: z.array(z.string()).default([])
  })
  .merge(baseObjectSchema)

const feedingSchema = z
  .object({
    reptile: z.string(),
    foodItem: z.string()
  })
  .merge(baseObjectSchema)

const husbandrySchema = z
  .object({
    reptile: z.string(),
    length: z.number().optional(),
    weight: z.number().optional(),
    temperature: z.number().optional(),
    humidity: z.number().optional()
  })
  .merge(baseObjectSchema)

const scheduleSchema = z
  .object({
    reptile: z.string(),
    type: z.nativeEnum(ScheduleType),
    description: z.string(),
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean()
  })
  .merge(baseObjectSchema)

export type User = z.infer<typeof userSchema>
export type Reptile = z.infer<typeof reptileSchema>
export type Feeding = z.infer<typeof feedingSchema>
export type HusbandryRecord = z.infer<typeof husbandrySchema>
export type Schedule = z.infer<typeof scheduleSchema>

type Schemas =
  | typeof reptileSchema
  | typeof userSchema
  | typeof feedingSchema
  | typeof husbandrySchema
  | typeof scheduleSchema

export type SchemaType =
  | "reptile"
  | "user"
  | "feeding"
  | "husbandry"
  | "schedule"

export const schemaMap: Record<SchemaType, Schemas> = {
  reptile: reptileSchema,
  user: userSchema,
  feeding: feedingSchema,
  husbandry: husbandrySchema,
  schedule: scheduleSchema
}

export type DbObject<T extends SchemaType> = T extends "reptile"
  ? Reptile
  : T extends "user"
  ? User
  : T extends "feeding"
  ? Feeding
  : T extends "husbandry"
  ? HusbandryRecord
  : T extends "schedule"
  ? Schedule
  : never
