import {
  creationDates,
  getCurrentDateTime,
  getReptilePartial
} from "../helperFunctions"
import {isCreateReptileBody} from "../json_validation/request_body"
import {ReqBuilder} from "../lib/auth_types"

export const createReptile: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    if (!isCreateReptileBody(body)) {
      return res
        .status(400)
        .json({error: "Invalid parameters for creating Reptile"})
    }
    const reptile = await client.reptile.createOne({
      ...body,
      ...creationDates(),
      user: jwtBody!.userId,
      feeding: [],
      husbandryRecord: [],
      schedule: []
    })
    return res.json(reptile)
  }

export const reptileDetail: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const reptile = await client.reptile.findOne({
      _id: params.id
    })
    if (!reptile) return res.json({error: "Please use a reptileID that exists"})

    return res.json(reptile)
  }

export const queryReptiles: ReqBuilder =
  (client) =>
  async ({body}, res) => {
    const reptiles = await client.reptile.findMany(body)
    return res.json(reptiles)
  }

export const updateReptile: ReqBuilder =
  (client) =>
  async ({params, body}, res) => {
    const exists = await client.reptile.findOne({_id: params.id})

    if (!exists) return res.status(404).json("Reptile does not exist")

    const reptilePartial = getReptilePartial(body)
    const reptile = await client.reptile.updateOne(exists._id, {
      ...reptilePartial,
      updatedAt: getCurrentDateTime()
    })
    return res.json(reptile)
  }

export const deleteReptile: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const exists = await client.reptile.findOne({
      _id: params.id
    })
    if (!exists) {
      return res.json({error: "Please use a reptileID that exists"})
    }
    await client.reptile.deleteOne(exists._id)
    return res.json({message: `Deleted the reptile with id ${exists._id}`})
  }
