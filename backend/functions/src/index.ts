import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { usersController } from "./controllers/user_controller";
import { reptilesController } from "./controllers/reptile_controller";
import { recordController } from "./controllers/record_controller";
import { feedingController } from "./controllers/feeding_controller";
import { scheduleController } from "./controllers/schedule_controller";
import * as functions from "firebase-functions";
import cors from "cors";
import { DbClient } from "./middleware/auth_types";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI!);

const client: DbClient = {
  user: {},
  reptile: {},
  husbandryRecord: {},
  feeding: {},
  schedule: {},
};

const app = express();
app.use(express.json()); // middleware to convert everything to json
app.use(cookieParser());
app.use(cors());

usersController(app, client);
reptilesController(app, client);
recordController(app, client);
feedingController(app, client);
scheduleController(app, client);

// export const helloWorld = functions.https.onRequest((req, res) => {
//   console.log(process.env.MONGO_URI);
//   console.log(process.env.ENCRYPTION_KEY);
//   res.send("Hello from Firebase!");
// });

// // mongoClient.connect().then(() => {
// //   const db = mongoClient.db("reptile-tracker");
// //   client.user = db.collection("user");
// //   client.reptile = db.collection("reptile");
// //   client.husbandryRecord = db.collection("husbandryRecord");
// //   client.feeding = db.collection("feeding");
// //   client.schedule = db.collection("schedule");
// // });

export const helloWorld = functions.https.onRequest((req, res) => {
  mongoClient.connect().then((client) => {
    const db = client.db("reptile-tracker-test");
    db.collection("reptile-test").insertOne({
      name: "test",
    });
    return res.send("Hello from Firebase!");
  });
});
