import { RequestHandler } from "express";
import { client } from "..";
import { getCurrentDateTime } from "../helperFunctions";
import { getReptilePartial, isCreateReptileBody } from "../inputHelpers";

export const getReptiles: RequestHandler = async (req, res) => {
  const reptiles = await client.reptile.findMany();
  res.json({ reptiles });
};

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
// Create a reptile POST
export const createReptile: RequestHandler = async (req, res) => {
  if (!isCreateReptileBody(req.body)) {
    return res
      .status(400)
      .json({ error: "Invalid parameters for creating Reptile" });
  }
  const { species, name, sex, userId } = req.body;
  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  const reptile = await client.reptile.create({
    data: {
      userId,
      species,
      name,
      sex,
      createdAt,
      updatedAt,
    },
  });
  res.json({ reptile });
};
