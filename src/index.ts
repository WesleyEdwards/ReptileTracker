import express, { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import {
  createReptile,
  getReptiles,
  updateReptile,
} from "./dbQueries/reptiles";
import {
  createSchedule,
  getAllSchedules,
  getScheduleByReptile,
  getScheduleByUser,
} from "./dbQueries/schedules";
import { createUser, getAllUsers } from "./dbQueries/users";

export const client = new PrismaClient();
const app = express();
app.use(express.json()); // middleware to convert everything to json

// TODO:
// Post user signs in
// Del delete a reptile
// Post create a feeding for reptile
// GET list all feedings for a reptile
// POST create husbandry record for a reptile

app.post("/users", createUser);
app.get("/users", getAllUsers);

app.post("/reptiles", createReptile);
app.get("/reptiles", getReptiles);
app.put("/reptiles/:id", updateReptile);

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
