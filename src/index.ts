import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  isCreateReptileBody,
  isCreateUserBody,
  getReptilePartial,
} from "./inputHelpers";

const client = new PrismaClient();
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
app.post("/users", async (req, res) => {
  if (!isCreateUserBody(req.body)) {
    return res.status(400).json({ error: "Invalid user Input" });
  }
  const { firstName, lastName, email, passwordHash } = req.body;
  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  const user = await client.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      createdAt,
      updatedAt,
    },
  });
  res.json({ user });
});

// List all users GET
app.get("/users", async (req, res) => {
  const users = await client.user.findMany();
  res.json({ users });
});

// List all reptiles GET
app.get("/reptiles", async (req, res) => {
  const reptiles = await client.reptile.findMany();
  res.json({ reptiles });
});

// Update a reptile PUT
// What is the best way to get the data back for a specific reptile? just update everything?
// Why doesn't postman think this is a put request?
app.put("/reptiles/:id", async (req, res) => {
  const reptileId = parseInt(req.params.id);
  const reptilePartial = getReptilePartial(req.body);

  const updatedAt = getCurrentDateTime();
  const currentReptile = await client.reptile.findUnique({
    where: { id: reptileId },
  });
  if (currentReptile === null) {
    return res
      .status(404)
      .json({ error: `Could not find reptile with id of ${reptileId}` });
  }
  const reptile = await client.reptile.update({
    where: {
      id: reptileId,
    },
    data: {
      sex: reptilePartial.sex ? reptilePartial.sex : currentReptile?.sex,
      name: reptilePartial.name ? reptilePartial.name : currentReptile?.name,
      species: reptilePartial.species
        ? reptilePartial.species
        : currentReptile?.species,
      updatedAt,
    },
  });
  res.json({ reptile });
});

// Create a reptile POST
app.post("/reptiles", async (req, res) => {
  if (!isCreateReptileBody(req.body)) {
    return res
      .status(400)
      .json({ error: "Invalid parameters for creating Reptile" });
  }
  const { species, name, sex, userId } = req.body;
  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  const reptile = await client.reptile.create({
    data: {
      userId,
      species,
      name,
      sex,
      createdAt,
      updatedAt,
    },
  });
  res.json({ reptile });
});

// List all schedules for a user GET
app.get("/schedules/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const schedules = await client.schedule.findMany({
    where: {
      userId: id,
    },
  });
  res.json({ schedules });
});

// All schedules for a reptile GET
app.get("/schedules/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const schedules = await client.schedule.findMany({
    where: {
      reptileId: id,
    },
  });
  res.json({ schedules });
});

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the homepage</h1>`);
});

app.listen(3000, () => {
  console.log("I got started!");
});

function getCurrentDateTime() {
  return new Date().toISOString();
}
