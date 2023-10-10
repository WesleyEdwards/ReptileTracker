import {getCurrentDateTime} from "../lib/helperFunctions"
import {
  checkPartialValidation,
  checkValidation,
  isParseError
} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createFeeding: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const feedingBody = checkValidation("feeding", body)
    if (isParseError(feedingBody)) return res.status(400).json(feedingBody)

    const condition = jwtBody?.admin
      ? {_id: feedingBody.reptile}
      : {_id: feedingBody.reptile, user: jwtBody?.userId ?? []}

    const reptileExists = await client.reptile.findOne(condition)
    if (!reptileExists) return res.status(404)

    const feeding = await client.feeding.createOne(feedingBody)
    if (!feeding) return res.json({error: "Error creating feeding"})

    await client.reptile.updateOne(feedingBody.reptile, {
      feeding: [...reptileExists.feeding, feeding._id],
      updatedAt: getCurrentDateTime()
    })

    return res.json(feeding)
  }

export const feedingDetail: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    const condition = jwtBody?.admin
      ? {_id: params.id}
      : {_id: params.id, user: jwtBody?.userId}
    const feeding = await client.feeding.findOne(condition)
    if (!feeding) return res.json({error: "feeding doesn't exist"})
    if (!jwtBody?.reptiles.includes(feeding.reptile)) return res.status(401)

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

    const feedingBody = checkPartialValidation("feeding", {
      ...body,
      _id: params.id,
      updatedAt: getCurrentDateTime()
    })
    if (isParseError(feedingBody)) return res.status(400).json(feedingBody)
    const feeding = await client.feeding.updateOne(params.id, feedingBody)
    return res.json(feeding)
  }

export const deleteFeeding: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    const exists = await client.feeding.findOne({
      _id: params.id
    })
    if (!exists) {
      return res.json({error: "Please use a feedingID that exists"})
    }
    const reptileExists = await client.reptile.findOne({
      _id: exists.reptile,
      user: jwtBody?.userId ?? ""
    })
    if (!reptileExists) return res.status(404)

    await client.feeding.deleteOne(exists._id)
    return res.json({message: `Deleted the feeding with id ${exists._id}`})
  }
