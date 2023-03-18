import { creationDates } from "../helperFunctions";
import { isCreateFeedingBody } from "../json_validation/request_body";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createFeeding: ReqBuilder =
  (client) =>
  async ({ body, jwtBody, params }, res) => {
    if (!isCreateFeedingBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const reptileId = parseInt(params.id);
    const reptileExists = await client.reptile.findFirst({
      where: { id: reptileId, userId: jwtBody?.userId },
    });

    if (!reptileExists) {
      return res.json({ error: "Invalid Reptile Id" });
    }

    const feeding = await client.feeding.create({
      data: {
        ...body,
        reptileId,
        ...creationDates,
      },
    });
    res.json({ feeding });
  };

// Get
export const getFeedingsByReptile: ReqBuilder =
  (client) => async (req, res) => {
    const { params, jwtBody } = req;
    const reptileId = parseInt(params.id);

    if (!jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });

    const userOwnsReptile = await client.reptile.findFirst({
      where: {
        id: reptileId,
        userId: jwtBody.userId,
      },
    });
    if (!userOwnsReptile) {
      return res
        .status(401)
        .json({ error: "No access to Reptile with the given id" });
    }
    const feedings = await client.feeding.findMany({
      where: {
        reptileId: reptileId,
      },
    });
    res.json({ feedings });
  };
