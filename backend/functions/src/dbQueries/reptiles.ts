import {getCurrentDateTime} from "../lib/helperFunctions"
import {
  checkPartialValidation,
  checkValidation,
  isParseError
} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createReptile: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const reptileBody = checkValidation("reptile", body)
    if (isParseError(reptileBody)) return res.status(400).json(reptileBody)
    if (jwtBody!.userId !== reptileBody.user) {
      return res.json({error: "You can only create a reptile for yourself"})
    }
    const reptile = await client.reptile.createOne(reptileBody)
    return res.json(reptile)
  }

export const reptileDetail: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    try {
      const condition = jwtBody?.admin
        ? {_id: params.id}
        : {_id: params.id, user: jwtBody?.userId ?? ""}
      const reptile = await client.reptile.findOne(condition)
      if (!reptile) return res.status(404)

      return res.json(reptile)
    } catch (error) {
      return res.status(500).json({error})
    }
  }

export const queryReptiles: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const condition = jwtBody?.admin ? body : {...body, user: jwtBody?.userId}
    const reptiles = await client.reptile.findMany(condition)
    return res.json(reptiles)
  }

export const updateReptile: ReqBuilder =
  (client) =>
  async ({params, body, jwtBody}, res) => {
    const reptilePartial = checkPartialValidation("reptile", {
      ...body,
      _id: params.id,
      updatedAt: getCurrentDateTime()
    })
    if (isParseError(reptilePartial)) {
      return res.status(400).json(reptilePartial)
    }
    const condition = jwtBody?.admin
      ? {_id: params.id}
      : {
          _id: params.id,
          user: jwtBody?.userId ?? ""
        }
    const exists = await client.reptile.findOne(condition)

    if (!exists) return res.status(404).json("Reptile does not exist")

    const reptile = await client.reptile.updateOne(exists._id, reptilePartial)
    return res.json(reptile)
  }

export const deleteReptile: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    const exists = await client.reptile.findOne({
      _id: params.id,
      user: jwtBody?.userId ?? ""
    })
    if (!exists) {
      return res.json({error: "Please use a reptileID that exists"})
    }
    await client.reptile.deleteOne(exists._id)
    return res.json({message: `Deleted the reptile with id ${exists._id}`})
  }
