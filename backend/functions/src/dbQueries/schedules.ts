import { creationDates, getCurrentDateTime } from "../helperFunctions";
import { isCreateSchedBody } from "../json_validation/request_body";
import { ReqBuilder } from "../lib/auth_types";

export const createSched: ReqBuilder =
  (client) =>
  async ({ body, jwtBody, params }, res) => {
    if (!isCreateSchedBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const reptileExists = await client.reptile.findOne({ _id: params.id });
    if (!reptileExists) {
      return res.json("Reptile does not exist");
    }

    const schedule = await client.schedule.createOne({
      ...body,
      reptile: reptileExists._id,
      user: jwtBody!.userId,
      ...creationDates(),
    });
    if (!schedule) return res.json("Error creating schedule");

    await client.reptile.updateOne(reptileExists._id, {
      schedule: [...reptileExists.schedule, schedule._id],
      updatedAt: getCurrentDateTime(),
    });

    return res.json(schedule);
  };

export const querySched: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    const schedules = await client.schedule.findMany(body);
    return res.json(schedules);
  };

export const updateSched: ReqBuilder =
  (client) =>
  async ({ body, params }, res) => {
    const schedule = await client.schedule.findOne({
      _id: params.id,
    });
    if (!schedule) {
      return res.status(400).json({ error: "Invalid Sched Id" });
    }
    const updatedSched = await client.schedule.updateOne(schedule._id, {
      ...body,
      updatedAt: getCurrentDateTime(),
    });
    return res.json(updatedSched);
  };

export const getSched: ReqBuilder =
  (client) =>
  async ({ params }, res) => {
    const schedule = await client.schedule.findOne({
      _id: params.id,
    });
    return res.json(schedule);
  };

export const deleteSched: ReqBuilder =
  (client) =>
  async ({ params }, res) => {
    const exists = await client.schedule.findOne({
      _id: params.id,
    });
    if (!exists) {
      return res.json({ error: "Please use a scheduleID that exists" });
    }
    await client.schedule.deleteOne(exists._id);
    return res.json({ message: `Deleted the schedule with id ${exists._id}` });
  };
