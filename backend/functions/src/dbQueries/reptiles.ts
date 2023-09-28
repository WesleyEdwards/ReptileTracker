import {
  creationDates,
  getCurrentDateTime,
  getReptilePartial,
} from "../helperFunctions";
import { isCreateReptileBody } from "../json_validation/request_body";
import { ReqBuilder } from "../middleware/auth_types";

export const createReptile: ReqBuilder =
  (client) =>
  async ({ body, jwtBody }, res) => {
    if (!isCreateReptileBody(body)) {
      return res
        .status(400)
        .json({ error: "Invalid parameters for creating Reptile" });
    }
    const userExists = await client.user.findOne({
      _id: jwtBody?.userId || "",
    });

    if (!userExists) return res.json({ error: "User does not exist" });

    const reptile = await client.reptile.createOne({
      ...body,
      ...creationDates(),
      user: jwtBody!.userId,
      feeding: [],
      husbandryRecord: [],
      schedule: [],
    });
    return res.json(reptile);
  };

export const getReptiles: ReqBuilder = (client) => async (req, res) => {
  const reptiles = await client.reptile.findMany({
    user: [req.jwtBody?.userId || ""],
  });
  return res.json(reptiles);
};

export const getReptileById: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const reptileId = params.id;
    if (!jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });
    const reptile = await client.reptile.findOne({
      _id: reptileId,
    });
    if (!reptile || !reptileId)
      return res.json({ error: "Please use a reptileID that exists" });

    return res.json(reptile);
  };

export const queryReptiles: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    console.log("QUERYING REPTILES");
    const reptiles = await client.reptile.findMany(body);
    return res.json(reptiles);
  };

// Update
export const updateReptile: ReqBuilder = (client) => async (req, res) => {
  const reptileId = req.params.id;
  const exists = await client.reptile.findOne({
    _id: reptileId,
  });
  if (!exists) return res.status(404).json({});

  const reptilePartial = getReptilePartial(req.body);
  const updatedAt = getCurrentDateTime();
  const reptile = await client.reptile.updateOne({
    ...reptilePartial,
    updatedAt,
  });
  return res.json(reptile);
};

// Delete
export const deleteReptile: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const reptileId = params.id;
    if (!jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });
    const exists = await client.reptile.findOne({
      _id: reptileId,
    });
    if (!exists || !reptileId)
      return res.json({ error: "Please use a reptileID that exists" });
    await client.reptile.deleteOne(reptileId);
    return res.json({ message: `Deleted the reptile with id ${reptileId}` });
  };
