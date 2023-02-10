import { RequestHandler } from "express";
import { client } from "..";
import { getCurrentDateTime, getReptilePartial } from "../helperFunctions";
import { isCreateReptileBody } from "../validationFunctions";

// Create
export const createReptile: RequestHandler = async ({ body }, res) => {
  if (!isCreateReptileBody(body)) {
    return res
      .status(400)
      .json({ error: "Invalid parameters for creating Reptile" });
  }
  const userExists = await client.user.findFirst({
    where: { id: body.userId },
  });
  if (!userExists) return res.json({ error: "User does not exist" });

  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  const reptile = await client.reptile.create({
    data: {
      ...body,
      createdAt,
      updatedAt,
    },
  });
  res.json({ reptile });
};

// Read
export const getReptiles: RequestHandler = async (req, res) => {
  const reptiles = await client.reptile.findMany();
  res.json({ reptiles });
};

// Update
export const updateReptile: RequestHandler = async (req, res) => {
  const reptileId = parseInt(req.params.id);
  const exists = await client.reptile.findFirst({
    where: { id: reptileId },
  });
  if (!exists) return res.status(404).json({});

  const reptilePartial = getReptilePartial(req.body);
  const updatedAt = getCurrentDateTime();
  const reptile = await client.reptile.update({
    where: {
      id: reptileId,
    },
    data: {
      ...reptilePartial,
      updatedAt,
    },
  });
  res.json({ reptile });
};
