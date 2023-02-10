import { RequestHandler } from "express";
import { client } from "..";

export const getScheduleByUser: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.id);
  const schedules = await client.schedule.findMany({
    where: {
      userId: userId,
    },
  });
  res.json({ schedules });
};

export const getScheduleByReptile: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const schedules = await client.schedule.findMany({
    where: {
      reptileId: id,
    },
  });
  res.json({ schedules });
};
