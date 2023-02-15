import { RequestHandler } from "express";
import { client } from "..";
import { getCurrentDateTime } from "../helperFunctions";
import { isCreateFeedingBody } from "../validationFunctions";
import { PrismaClient } from "@prisma/client";

// Create
export const createFeeding =
  (client: PrismaClient): RequestHandler =>
  async ({ body }, res) => {
    if (!isCreateFeedingBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const createdAt = getCurrentDateTime();
    const updatedAt = createdAt;
    const feeding = await client.feeding.create({
      data: {
        ...body,
        createdAt,
        updatedAt,
      },
    });
    res.json({ feeding });
  };

// Get
export const getAllFeedings =
  (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const reptileId = parseInt(req.params.id);
    const feedings = await client.feeding.findMany({
      where: {
        reptileId: reptileId,
      },
    });
    res.json({ feedings });
  };
