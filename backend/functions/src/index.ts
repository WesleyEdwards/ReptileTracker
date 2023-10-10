import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {usersController} from "./controllers/user_controller"
import {reptilesController} from "./controllers/reptile_controller"
import {recordController} from "./controllers/record_controller"
import {feedingController} from "./controllers/feeding_controller"
import {scheduleController} from "./controllers/schedule_controller"
import * as functions from "firebase-functions"
import cors from "cors"
import {DbClient} from "./lib/auth_types"
import {mongoClient} from "./mongo/mongoClient"

dotenv.config()

const client: DbClient = mongoClient()

const app = express()
app.use(express.json()) // middleware to convert everything to json
app.use(cookieParser())
app.use(cors())

usersController(app, client)
reptilesController(app, client)
recordController(app, client)
feedingController(app, client)
scheduleController(app, client)

app.get("/", (_, res) => {
  res.send("Welcome to reptile-tracker!")
})

export const api = functions.https.onRequest(app)
