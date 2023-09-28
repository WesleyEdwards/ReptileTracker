import { creationDates, getCurrentDateTime } from "../helperFunctions";
import { isCreateScheduleBody } from "../json_validation/request_body";
import { ReqBuilder, isError } from "../middleware/auth_types";

// Create
export const createSchedule: ReqBuilder =
  (client) =>
  async ({ body, jwtBody, params }, res) => {
    const reptileId = params.id;
    if (!isCreateScheduleBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const reptileExists = await client.reptile.findOne({
      _id: reptileId,
    });

    if (isError(reptileExists)) {
      return res.json(reptileExists);
    }

    const schedule = await client.schedule.createOne({
      ...body,
      reptile: reptileExists._id,
      user: jwtBody!.userId,
      ...creationDates(),
    });
    return res.json({ schedule });
  };

export const getScheduleByUser: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const userId = params.id;
    if (userId !== jwtBody?.userId)
      return res
        .status(401)
        .json({ error: "No access to User with the given id" });
    const schedules = await client.schedule.findMany({
      user: [userId],
    });
    return res.json({ schedules });
  };

export const getScheduleByReptile: ReqBuilder =
  (client) =>
  async ({ params }, res) => {
    const id = params.id;
    const schedules = await client.schedule.findMany({
      reptile: [id],
    });
    res.json({ schedules });
  };

export const updateSchedule: ReqBuilder =
  (client) =>
  async ({ body, params }, res) => {
    const id = params.id;
    const schedule = await client.schedule.findOne({
      _id: id,
    });
    if (!schedule) {
      return res.status(400).json({ error: "Invalid Schedule Id" });
    }
    const updatedSchedule = await client.schedule.updateOne({
      _id: id,
      ...body,
      updatedAt: getCurrentDateTime(),
    });
    return res.json({ schedule: updatedSchedule });
  };

export const getSchedule: ReqBuilder =
  (client) =>
  async ({ params }, res) => {
    const id = params.id;
    const schedule = await client.schedule.findOne({
      _id: id,
    });
    return res.json({ schedule });
  };
