import {createUserToken, sendUserBody} from "../lib/helperFunctions"
import bcrypt from "bcrypt"
import {ReqBuilder} from "../lib/auth_types"
import {
  checkLoginValidation,
  checkValidation,
  isParseError
} from "../json_validation/request_body"

export const createUser: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    if (!("password" in body)) {
      return res.status(400).json({error: "Password is required"})
    }
    const passwordHash = await bcrypt.hash(body.password, 10)
    const userBody = checkValidation("user", {...body, passwordHash})
    if (isParseError(userBody)) return res.status(400).json(userBody)
    if (userBody.admin && !jwtBody?.admin) {
      return res.status(401).json("Unauthorized")
    }

    const emailExists = await client.user.findOne({
      email: userBody.email
    })
    if (emailExists) {
      return res.status(400).json({error: "Email already exists"})
    }
    const user = await client.user.createOne(userBody)
    if (!user) return res.status(500).json({error: "Error creating user"})

    const reptiles = await client.reptile.findMany({user: [user._id]})
    const token = createUserToken({
      userId: user._id,
      admin: user.admin,
      reptiles: reptiles.map((r) => r._id)
    })
    return res.json({user: sendUserBody(user), token})
  }

export const deleteUser: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    if (!jwtBody?.admin) return res.status(401).json("Unauthorized")
    const response = await client.user.deleteOne(params.id)
    return res.json(`User ${response} successfully deleted`)
  }

export const getUser: ReqBuilder =
  (client) =>
  async ({params, jwtBody}, res) => {
    if (!jwtBody?.admin || jwtBody.userId !== params.id) {
      return res.status(401).json("Unauthorized")
    }
    const user = await client.user.findOne({_id: params.id})
    if (!user) return res.status(404)
    return res.json(sendUserBody(user))
  }

export const queryUser: ReqBuilder =
  (client) =>
  async ({body, jwtBody}, res) => {
    const condition = jwtBody?.admin ? body : {...body, _id: jwtBody?.userId}
    const users = await client.user.findMany(condition)
    return res.json(users?.map(sendUserBody))
  }

export const getSelf: ReqBuilder =
  (client) =>
  async ({jwtBody}, res) => {
    const user = await client.user.findOne({
      _id: jwtBody?.userId || ""
    })
    if (!user) return res.status(404)
    return res.json(sendUserBody(user))
  }

export const refreshToken: ReqBuilder =
  (client) =>
  async ({jwtBody}, res) => {
    const reptiles = await client.reptile.findMany({user: [jwtBody!.userId]})
    if (isParseError(reptiles)) return res.status(404)
    return res.json(
      createUserToken({
        userId: jwtBody!.userId,
        admin: jwtBody!.admin,
        reptiles: reptiles.map((r) => r._id)
      })
    )
  }

export const loginUser: ReqBuilder =
  (client) =>
  async ({body}, res) => {
    const loginBody = checkLoginValidation(body)
    if (isParseError(loginBody)) return res.status(400).json(loginBody)

    const user = await client.user.findOne({email: loginBody.email})
    if (!user) {
      res.status(404).json({message: "Invalid email or password"})
      return
    }

    const isValid = await bcrypt.compare(loginBody.password, user.passwordHash)
    if (!isValid) {
      return res.status(404).json({message: "Invalid email or password"})
    }
    const reptiles = await client.reptile.findMany({user: [user._id]})
    return res.json({
      user: sendUserBody(user),
      token: createUserToken({
        userId: user._id,
        admin: user.admin,
        reptiles: reptiles.map((r) => r._id)
      })
    })
  }
