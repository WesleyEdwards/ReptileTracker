import { client } from "..";
import { getCurrentDateTime } from "../helperFunctions";
import { emptyScheduleDays } from "../types";
import { isCreateHusbandryBody } from "../validationFunctions";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

// Create
export const createHusbandryRecord =
  (client: PrismaClient): RequestHandler =>
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
export const getAllRecords =
  (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const records = await client.husbandryRecord.findMany({
      where: {
        reptileId: reptileId,
      },
    });
    res.json({ records });
  };
