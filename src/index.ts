import express from "express";
import { PrismaClient } from "@prisma/client";
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

type CreateUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};
// Post create a user account
app.post("/users", async (req, res) => {
  const { firstName, lastName, email, passwordHash } =
    req.body as CreateUserBody;
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

// GET list all users
app.get("/users", async (req, res) => {
  const users = await client.user.findMany();
  res.json({ users });
});

type CreateReptileBody = {
  userId: number;
  species: string;
  name: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};

// GET list all reptiles
app.get("/reptiles", async (req, res) => {
  const reptiles = await client.reptile.findMany();
  res.json({ reptiles });
});

// PUT update a reptile
// What is the best way to get the data back for a specific reptile? just update everything?
// Why doesn't postman think this is a put request?
app.put("/reptiles/:id", async (req, res) => {
  console.log("UDPATE REPTILE");
  const reptileId = parseInt(req.params.id);
  const { species, name, sex, userId } = req.body as CreateReptileBody;
  const reptile = await client.reptile.update({
    where: {
      id: reptileId,
    },
    data: {
      species: species,
      name: name,
      sex: sex,
      userId: userId,
    },
  });
  res.json({ reptile });
});

// Post create a reptile
app.post("/reptiles", async (req, res) => {
  const { species, name, sex } = req.body as CreateReptileBody;
  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  const userId = parseInt(req.body.userId);
  console.log(req.body);
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

// GET list all schedules for a user
app.get("/schedules/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const schedules = await client.schedule.findMany({
    where: {
      userId: id,
    },
  });
  res.json({ schedules });
});

// GET all schedules for a reptile
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
