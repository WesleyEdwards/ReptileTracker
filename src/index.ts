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

export const client = new PrismaClient();
const app = express();
app.use(express.json()); // middleware to convert everything to json

// TODO:
// Post user signs in
// Make sure the user can only access reptiles that are associated with their account
// Make sure the user can't access anything unless signed in

app.post("/users", createUser);
app.get("/users", getAllUsers);

app.post("/reptiles", createReptile);
app.delete("/reptiles/:id", deleteReptile);
app.put("/reptiles/:id", updateReptile);
app.get("/reptiles", getReptiles);

app.post("/feeding/", createFeeding);
app.get("/feeding/:id", getAllFeedings); // id indicates the reptile id we want to get all feedings for

app.post("/record/", createHusbandryRecord);
app.get("/record/:id", getAllRecords);

app.post("/schedules", createSchedule);
app.get("/schedules", getAllSchedules);
app.get("/schedules/:id", getScheduleByReptile);
app.get("/schedules/user/:id", getScheduleByUser);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the homepage</h1>`);
});

app.listen(3000, () => {
  console.log("I got started!");
});
