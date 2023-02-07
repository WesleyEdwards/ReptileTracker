import express from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
const app = express();
app.use(express.json()); // middleware to convert everything to json

// TODO:

// Post user signs in
// Del delete a reptile
// PUT update a reptile
// Post create a feeding for reptile
// GET list all feedings for a reptile
// POST create husbandry record for a reptile
// POST create a schedule for a reptile
// GET all schedules for a reptile

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
  const { firstName, lastName, email, passwordHash, createdAt, updatedAt } =
    req.body as CreateUserBody;
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

// GET list all reptiles
app.get("/reptiles", async (req, res) => {
  const reptiles = await client.reptile.findMany();
  res.json({ reptiles });
});

type CreateReptileBody = {
  userId: number;
  species: string;
  name: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};
// Post create a reptile
app.post("/reptiles", async (req, res) => {
  const { userId, species, name, sex, createdAt, updatedAt } =
    req.body as CreateReptileBody;
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

app.get("/", (req, res) => {
  res.send(`<h1>Hello, world!</h1>`);
});

app.listen(3000, () => {
  console.log("I got started!");
});
