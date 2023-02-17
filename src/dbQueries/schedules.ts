import { creationDates, getCurrentDateTime } from "../helperFunctions";
import { isCreateScheduleBody } from "../json_validation/request_body";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createSchedule: ReqBuilder =
  (client) =>
  async ({ body, jwtBody }, res) => {
    if (!isCreateScheduleBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const reptileExists = await client.reptile.findFirst({
      where: { id: body.reptileId, userId: jwtBody?.userId },
    });

    if (!reptileExists) {
      return res.json({ error: "Invalid User or Reptile Id" });
    }

    const schedules = await client.schedule.create({
      data: {
        ...body,
        userId: jwtBody!.userId,
        ...creationDates,
      },
    });
    res.json({ schedules });
  };

export const getScheduleByUser: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const userId = parseInt(params.id);
    if (userId !== jwtBody?.userId)
      return res
        .status(401)
        .json({ error: "No access to User with the given id" });
    const schedules = await client.schedule.findMany({
      where: {
        userId: userId,
      },
    });
    res.json({ schedules });
  };

export const getScheduleByReptile: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const id = parseInt(params.id);
    const schedules = await client.schedule.findMany({
      where: {
        reptileId: id,
        userId: jwtBody?.userId,
      },
    });
    res.json({ schedules });
  };
