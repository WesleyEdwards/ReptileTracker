import {getCurrentDateTime} from "../lib/helperFunctions"
import {
  checkPartialValidation,
  checkValidation,
  isParseError
} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createSched: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const schedBody = checkValidation("schedule", {
      ...body,
      user: jwtBody!.userId
    })
    if (isParseError(schedBody)) return res.status(400).json(schedBody)
    const reptileExists = await client.reptile.findOne({
      _id: schedBody.reptile,
      user: jwtBody?.userId ?? ""
    })
    if (!reptileExists) {
      return res.json("Reptile does not exist")
    }

    const schedule = await client.schedule.createOne(schedBody)
    if (!schedule) return res.json("Error creating schedule")

    await client.reptile.updateOne(reptileExists._id, {
      schedule: [...reptileExists.schedule, schedule._id],
      updatedAt: getCurrentDateTime()
    })

    return res.json(schedule)
  }

export const querySched: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const condition = jwtBody?.admin ? body : {...body, user: jwtBody?.userId}
    const schedules = await client.schedule.findMany(condition)
    return res.json(schedules)
  }

export const updateSched: ReqBuilder =
  (client) =>
  async ({body, params}, res) => {
    const schedBody = checkPartialValidation("schedule", {
      ...body,
      _id: params.id,
      updatedAt: getCurrentDateTime()
    })
    if (isParseError(schedBody)) return res.status(400).json(schedBody)
    const updatedSched = await client.schedule.updateOne(params._id, schedBody)
    return res.json(updatedSched)
  }

export const getSched: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    const condition = jwtBody?.admin
      ? {_id: params.id}
      : {_id: params.id, user: jwtBody?.userId}
    const schedule = await client.schedule.findOne(condition)
    return res.json(schedule)
  }

export const deleteSched: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    const condition = jwtBody?.admin
      ? {_id: params.id}
      : {_id: params.id, reptile: jwtBody?.reptiles ?? []}
    const exists = await client.schedule.findOne(condition)
    if (!exists) {
      return res.json({error: "Please use a scheduleID that exists"})
    }

    const reptile = await client.reptile.findOne({
      _id: exists._id,
      user: jwtBody?.userId ?? ""
    })
    if (!reptile) return res.status(404)

    await client.schedule.deleteOne(exists._id)
    return res.json({message: `Deleted the schedule with id ${exists._id}`})
  }
