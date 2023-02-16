import { RequestHandler } from "express";
import { client } from "..";
import { getCurrentDateTime } from "../helperFunctions";
import { emptyScheduleDays } from "../types";
import { isCreateScheduleBody } from "../validationFunctions";
import { PrismaClient } from "@prisma/client";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createSchedule: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isCreateScheduleBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const reptileExists = await client.reptile.findFirst({
      where: { id: body.reptileId },
    });
    const userExists = await client.user.findFirst({
      where: { id: body.userId },
    });

    if (!(reptileExists && userExists)) {
      return res.json({ error: "Invalid User or Reptile Id" });
    }

    const createdAt = getCurrentDateTime();
    const schedules = await client.schedule.create({
      data: {
        ...body,
        ...emptyScheduleDays,
        createdAt,
        updateAt: createdAt,
      },
    });
    res.json({ schedules });
  };

// Read
export const getAllSchedules: ReqBuilder = (client) => async (req, res) => {
  const schedules = await client.schedule.findMany();
  return res.json({ schedules });
};

export const getScheduleByUser: ReqBuilder = (client) => async (req, res) => {
  const userId = parseInt(req.params.id);
  const schedules = await client.schedule.findMany({
    where: {
      userId: userId,
    },
  });
  res.json({ schedules });
};

export const getScheduleByReptile: ReqBuilder =
  (client) => async (req, res) => {
    const id = parseInt(req.params.id);
    const schedules = await client.schedule.findMany({
      where: {
        reptileId: id,
      },
    });
    res.json({ schedules });
  };
