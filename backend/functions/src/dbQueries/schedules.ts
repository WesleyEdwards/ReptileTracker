import {getCurrentDateTime} from "../helperFunctions"
import {
  checkPartialValidation,
  checkValidation
} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createSched: ReqBuilder =
  (client) =>
  async ({body, jwtBody, params}, res) => {
    const reptileExists = await client.reptile.findOne({_id: params.id})
    if (!reptileExists) {
      return res.json("Reptile does not exist")
    }
    const schedBody = checkValidation("schedule", {
      ...body,
      reptile: reptileExists._id,
      user: jwtBody!.userId
    })

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
  async ({body}, res) => {
    const schedules = await client.schedule.findMany(body)
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
    const updatedSched = await client.schedule.updateOne(params._id, schedBody)
    return res.json(updatedSched)
  }

export const getSched: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const schedule = await client.schedule.findOne({
      _id: params.id
    })
    return res.json(schedule)
  }

export const deleteSched: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const exists = await client.schedule.findOne({
      _id: params.id
    })
    if (!exists) {
      return res.json({error: "Please use a scheduleID that exists"})
    }
    await client.schedule.deleteOne(exists._id)
    return res.json({message: `Deleted the schedule with id ${exists._id}`})
  }
