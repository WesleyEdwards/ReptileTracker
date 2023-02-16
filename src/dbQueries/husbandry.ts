import { client } from "..";
import { getCurrentDateTime } from "../helperFunctions";
import { emptyScheduleDays } from "../types";
import { isCreateHusbandryBody } from "../validationFunctions";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createHusbandryRecord: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isCreateHusbandryBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const createdAt = getCurrentDateTime();
    const updatedAt = createdAt;
    const husbandryRecord = await client.husbandryRecord.create({
      data: {
        ...body,
        createdAt,
        updatedAt,
      },
    });
    res.json({ husbandryRecord });
  };

// Get
export const getAllRecords: ReqBuilder = (client) => async (req, res) => {
  const reptileId = parseInt(req.params.id);
  const records = await client.husbandryRecord.findMany({
    where: {
      reptileId: reptileId,
    },
  });
  res.json({ records });
};
