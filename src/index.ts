import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Hello, world!</h1>`);
});

app.listen(3000, () => {
  console.log("I got started!");
});
