import {getCurrentDateTime} from "../helperFunctions"
import {
  checkPartialValidation,
  checkValidation
} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createFeeding: ReqBuilder =
  (client) =>
  async ({body, params}, res) => {
    const feedingBody = checkValidation("feeding", {
      ...body,
      reptile: params.id
    })

    const reptileExists = await client.reptile.findOne({_id: params.id})
    if (!reptileExists) {
      return res.json({error: "Invalid Reptile Id"})
    }

    const feeding = await client.feeding.createOne(feedingBody)
    if (!feeding) return res.json({error: "Error creating feeding"})

    await client.reptile.updateOne(params.id, {
      feeding: [...reptileExists.feeding, feeding._id],
      updatedAt: getCurrentDateTime()
    })

    return res.json(feeding)
  }

export const feedingDetail: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const feeding = await client.feeding.findOne({
      _id: params.id
    })
    if (!feeding) return res.json({error: "Please use a feedingID that exists"})

    return res.json(feeding)
  }

export const queryFeedings: ReqBuilder =
  (client) =>
  async ({body}, res) => {
    const feedings = await client.feeding.findMany(body)
    return res.json(feedings)
  }

export const updateFeeding: ReqBuilder =
  (client) =>
  async ({params, body}, res) => {
    const exists = await client.feeding.findOne({_id: params.id})

    if (!exists) return res.status(404).json("Feeding does not exist")

    const feedingPartial = checkPartialValidation("feeding", {
      ...body,
      _id: params.id,
      updatedAt: getCurrentDateTime()
    })
    const feeding = await client.feeding.updateOne(params.id, feedingPartial)
    return res.json(feeding)
  }

export const deleteFeeding: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const exists = await client.feeding.findOne({
      _id: params.id
    })
    if (!exists) {
      return res.json({error: "Please use a feedingID that exists"})
    }
    await client.feeding.deleteOne(exists._id)
    return res.json({message: `Deleted the feeding with id ${exists._id}`})
  }
