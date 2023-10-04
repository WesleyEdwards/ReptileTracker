import {getCurrentDateTime} from "../lib/helperFunctions"
import {
  checkPartialValidation,
  checkValidation,
  isParseError
} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createHusbandry: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const newHusbandry = checkValidation("husbandry", body)
    if (isParseError(newHusbandry)) return res.status(400).json(newHusbandry)

    const reptileExists = await client.reptile.findOne({
      _id: newHusbandry.reptile,
      user: jwtBody?.userId ?? ""
    })
    if (!reptileExists) {
      return res.json("Reptile does not exist")
    }

    const husbandry = await client.husbandryRecord.createOne(newHusbandry)

    if (!husbandry) return res.json("Error creating husbandry")

    await client.reptile.updateOne(reptileExists._id, {
      husbandryRecord: [...reptileExists.husbandryRecord, husbandry._id],
      updatedAt: getCurrentDateTime()
    })

    return res.json(husbandry)
  }

export const husbandryDetail: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    const condition = jwtBody?.admin
      ? {_id: params.id}
      : {_id: params.id, user: jwtBody?.userId}
    const husbandry = await client.husbandryRecord.findOne(condition)
    if (!husbandry)
      return res.json({error: "Please use a husbandryID that exists"})

    return res.json(husbandry)
  }

export const queryHusbandry: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const condition = jwtBody?.admin ? body : {...body, user: jwtBody?.userId}
    const husbandry = await client.husbandryRecord.findMany(condition)
    return res.json(husbandry)
  }

export const updateHusbandry: ReqBuilder =
  (client) =>
  async ({params, body, jwtBody}, res) => {
    const condition = jwtBody?.admin
      ? {_id: params.id}
      : {_id: params.id, user: jwtBody?.userId}
    const exists = await client.husbandryRecord.findOne(condition)

    if (!exists) return res.status(404).json("Husbandry does not exist")

    const husbandryPartial = checkPartialValidation("husbandry", {
      ...body,
      _id: params.id,
      updatedAt: getCurrentDateTime()
    })
    if (isParseError(husbandryPartial)) {
      return res.status(400).json(husbandryPartial)
    }
    const husbandry = await client.husbandryRecord.updateOne(
      params.id,
      husbandryPartial
    )
    return res.json(husbandry)
  }

export const deleteHusbandry: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    const condition = jwtBody?.admin
      ? {_id: params.id}
      : {_id: params.id, user: jwtBody?.userId}
    const exists = await client.husbandryRecord.findOne(condition)
    if (!exists) {
      return res.json({error: "Please use a reptileID that exists"})
    }

    await client.husbandryRecord.deleteOne(exists._id)
    return res.json({message: `Deleted the husbandry with id ${exists._id}`})
  }
