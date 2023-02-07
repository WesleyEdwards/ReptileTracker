import express from "express";
import { PrismaClient } from "@prisma/client";
const Client = new PrismaClient();
const app = express();
app.use(express.json()); // middleware to convert everything to json

// TODO:
// Post create a user account
// Post user signs in
// Post create a reptile
// Del delete a reptile
// PUT update a reptile
// GET list all reptiles
// Post create a feeding for reptile
// GET list all feedings for a reptile
// POST create husbandry record for a reptile
// POST create a schedule for a reptile
// GET all schedules for a reptile
// GET list all schedules for a user

app.get("/", (req, res) => {
  res.send(`<h1>Hello, world!</h1>`);
});

app.listen(3000, () => {
  console.log("I got started!");
});
