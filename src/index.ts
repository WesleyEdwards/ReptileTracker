import express, { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import {
  isCreateReptileBody,
  isCreateUserBody,
  getReptilePartial,
} from "./inputHelpers";
import {
  createReptile,
  getReptiles,
  updateReptile,
} from "./dbQueries/reptiles";
import { getScheduleByReptile, getScheduleByUser } from "./dbQueries/schedules";
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
// POST create a schedule for a reptile

// Create a user account POST

app.post("/users", createUser);

app.get("/users", getAllUsers);

app.get("/reptiles", getReptiles);
app.put("/reptiles/:id", updateReptile);
app.post("/reptiles", createReptile);

app.get("/schedules/:id", getScheduleByReptile);
app.get("/schedules/user/:id", getScheduleByUser);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the homepage</h1>`);
});

app.listen(3000, () => {
  console.log("I got started!");
});
