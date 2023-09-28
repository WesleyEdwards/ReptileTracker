import { creationDates } from "../helperFunctions";
import { isCreateFeedingBody } from "../json_validation/request_body";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createFeeding: ReqBuilder =
  (client) =>
  async ({ body, params }, res) => {
    if (!isCreateFeedingBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const reptileId = params.id;
    const reptileExists = await client.reptile.findOne({
      _id: reptileId,
    });

    if (!reptileExists) {
      return res.json({ error: "Invalid Reptile Id" });
    }

    const feeding = await client.feeding.createOne({
      ...body,
      reptile: reptileId,
      ...creationDates(),
    });
    return res.json({ feeding });
  };

// Get
export const getFeedingsByReptile: ReqBuilder =
  (client) => async (req, res) => {
    const { params, jwtBody } = req;
    const reptileId = params.id;

    if (!jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });

    const userOwnsReptile = await client.reptile.findOne({
      _id: reptileId,
      user: jwtBody.userId,
    });
    if (!userOwnsReptile) {
      return res
        .status(401)
        .json({ error: "No access to Reptile with the given id" });
    }
    const feedings = await client.feeding.findMany({
      reptile: [reptileId],
    });
    return res.json({ feedings });
  };
