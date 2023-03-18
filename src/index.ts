import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { usersController } from "./controllers/user_controller";
import { reptilesController } from "./controllers/reptile_controller";
import { recordController } from "./controllers/record_controller";
import { feedingController } from "./controllers/feeding_controller";
import { scheduleController } from "./controllers/schedule_controller";
import cors from "cors";

dotenv.config();
const client = new PrismaClient();
const app = express();
app.use(express.json()); // middleware to convert everything to json
app.use(cookieParser());
app.use(cors());

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
