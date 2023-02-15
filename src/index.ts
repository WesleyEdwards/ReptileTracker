import express, { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createReptile,
  getReptiles,
  updateReptile,
  deleteReptile,
} from "./dbQueries/reptiles";
import {
  createSchedule,
  getAllSchedules,
  getScheduleByReptile,
  getScheduleByUser,
} from "./dbQueries/schedules";
import { createUser, getAllUsers } from "./dbQueries/users";
import { createFeeding, getAllFeedings } from "./dbQueries/feeding";
import { createHusbandryRecord, getAllRecords } from "./dbQueries/husbandry";
import { authenticationMiddleware } from "./middleware/authentication";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { usersController } from "./controllers/user_controller";
import { reptilesController } from "./controllers/reptile_controller";
import { recordController } from "./controllers/record_controller";
import { feedingController } from "./controllers/feeding_controller";
import { scheduleController } from "./controllers/schedule_controller";

dotenv.config();
export const client = new PrismaClient();
const app = express();
app.use(express.json()); // middleware to convert everything to json
app.use(cookieParser());

// TODO:
// Post user signs in
// Make sure the user can only access reptiles that are associated with their account
// Make sure the user can't access anything unless signed in
usersController(app, client);
reptilesController(app, client);
recordController(app, client);
feedingController(app, client);
scheduleController(app, client);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the homepage</h1>`);
});

app.listen(parseInt(process.env.PORT || "3000", 10), () => {
  console.log(`App running on port ${process.env.PORT}`);
});

export default app;
