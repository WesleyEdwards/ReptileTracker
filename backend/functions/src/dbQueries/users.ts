import {createUserToken} from "../helperFunctions"
import bcrypt from "bcrypt"
import {ReqBuilder} from "../lib/auth_types"
import {
  checkLoginValidation,
  checkValidation
} from "../json_validation/request_body"

export const createUser: ReqBuilder =
  (client) =>
  async ({body}, res) => {
    if (!("password" in body)) {
      return res.status(400).json({error: "Password is required"})
    }
    const passwordHash = await bcrypt.hash(body.password, 10)
    const createUserBody = checkValidation("user", {...body, passwordHash})

    const emailExists = await client.user.findOne({
      email: createUserBody.email
    })
    if (emailExists) {
      return res.status(400).json({error: "Email already exists"})
    }
    const newUser = checkValidation("user", createUserBody)
    const user = await client.user.createOne(newUser)
    if (!user) return res.status(400).json({error: "Error creating user"})

    const token = createUserToken(user._id)
    return res.json({user, token})
  }

export const deleteUser: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const response = await client.user.deleteOne(params.id)
    return res.json(`User ${response} successfully deleted`)
  }

export const getUser: ReqBuilder =
  (client) =>
  async ({params}, res) => {
    const user = await client.user.findOne({_id: params.id})
    return res.json(user)
  }

export const queryUser: ReqBuilder =
  (client) =>
  async ({params, body}, res) => {
    const users = await client.user.findMany(body)
    return res.json(users)
  }

export const getSelf: ReqBuilder =
  (client) =>
  async ({jwtBody}, res) => {
    const user = await client.user.findOne({
      _id: jwtBody?.userId || ""
    })
    return res.json(user)
  }

export const loginUser: ReqBuilder =
  (client) =>
  async ({body}, res) => {
    try {
      const loginBody = checkLoginValidation(body)
      const user = await client.user.findOne({email: loginBody.email})
      if (!user) {
        res.status(404).json({message: "Invalid email or password"})
        return
      }

      const isValid = await bcrypt.compare(
        loginBody.password,
        user.passwordHash
      )
      if (!isValid) {
        res.status(404).json({message: "Invalid email or password"})
        return
      }
      const token = createUserToken(user._id)
      return res.json({user, token})
    } catch (error) {
      // console.log(error)
      return res.status(400).json({error})
    }
  }
