import {getCurrentDateTime} from "../helperFunctions"
import {
  checkPartialValidation,
  checkValidation
} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createHusbandry: ReqBuilder =
  (client) =>
  async ({body, params}, res) => {
    const newHusbandry = checkValidation("husbandry", body)

    const reptileExists = await client.reptile.findOne({
      _id: newHusbandry.reptile
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
  async ({params}, res) => {
    const husbandry = await client.husbandryRecord.findOne({
      _id: params.id
    })
    if (!husbandry)
      return res.json({error: "Please use a husbandryID that exists"})

    return res.json(husbandry)
  }

export const queryHusbandry: ReqBuilder =
  (client) =>
  async ({body}, res) => {
    const husbandry = await client.husbandryRecord.findMany(body)
    return res.json(husbandry)
  }

export const updateHusbandry: ReqBuilder =
  (client) =>
  async ({params, body}, res) => {
    const exists = await client.husbandryRecord.findOne({_id: params.id})

    if (!exists) return res.status(404).json("Husbandry does not exist")

    const husbandryPartial = checkPartialValidation("husbandry", {
      ...body,
      _id: params.id,
      updatedAt: getCurrentDateTime()
    })
    const husbandry = await client.husbandryRecord.updateOne(
      params.id,
      husbandryPartial
    )
    return res.json(husbandry)
  }

export const deleteHusbandry: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const exists = await client.husbandryRecord.findOne({
      _id: params.id
    })
    if (!exists) {
      return res.json({error: "Please use a reptileID that exists"})
    }
    await client.husbandryRecord.deleteOne(exists._id)
    return res.json({message: `Deleted the husbandry with id ${exists._id}`})
  }
