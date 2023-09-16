import {
  creationDates,
  getCurrentDateTime,
  getReptilePartial,
} from "../helperFunctions";
import { isCreateReptileBody } from "../json_validation/request_body";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createReptile: ReqBuilder =
  (client) =>
  async ({ body, jwtBody }, res) => {
    if (!isCreateReptileBody(body)) {
      return res
        .status(400)
        .json({ error: "Invalid parameters for creating Reptile" });
    }
    const userExists = await client.user.findFirst({
      where: { id: jwtBody?.userId },
    });
    if (!userExists) return res.json({ error: "User does not exist" });

    const reptile = await client.reptile.create({
      data: {
        ...body,
        userId: jwtBody!.userId,
        ...creationDates,
      },
    });
    return res.json({ reptile });
  };

// Read
export const getReptiles: ReqBuilder = (client) => async (req, res) => {
  if (!req.jwtBody?.userId)
    return res.status(401).json({ error: "Unauthorized" });
  const reptiles = await client.reptile.findMany({
    where: {
      userId: req.jwtBody?.userId,
    },
  });
  return res.json({ reptiles });
};

export const getReptileById: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const reptileId = parseInt(params.id);
    if (!jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });
    const reptile = await client.reptile.findFirst({
      where: { id: reptileId },
    });
    if (!reptile || !reptileId)
      return res.json({ error: "Please use a reptileID that exists" });

    return res.json({ reptile });
  };

// Update
export const updateReptile: ReqBuilder = (client) => async (req, res) => {
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
  return res.json({ reptile });
};

// Delete
export const deleteReptile: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const reptileId = parseInt(params.id);
    if (!jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });
    const exists = await client.reptile.findFirst({
      where: { id: reptileId },
    });
    if (!exists || !reptileId)
      return res.json({ error: "Please use a reptileID that exists" });
    await client.reptile.delete({
      where: { id: reptileId },
    });
    return res.json({ message: `Deleted the reptile with id ${reptileId}` });
  };
