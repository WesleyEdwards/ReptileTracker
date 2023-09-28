import { creationDates } from "../helperFunctions";
import { isCreateHusbandryBody } from "../json_validation/request_body";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createHusbandryRecord: ReqBuilder =
  (client) =>
  async ({ body, params }, res) => {
    if (!isCreateHusbandryBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const reptileId = params.id;
    const reptileExists = await client.reptile.findOne({
      _id: reptileId,
    });
    if (!reptileExists) {
      return res.json({ error: "Invalid Reptile Id" });
    }
    const husbandryRecord = await client.husbandryRecord.createOne({
      reptile: reptileId,
      ...body,
      ...creationDates(),
    });
    return res.json({ husbandryRecord });
  };

// Get
export const getReptileRecords: ReqBuilder =
  (client) =>
  async ({ params, jwtBody }, res) => {
    const reptileId = params.id;
    if (!jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });
    const userOwnsReptile = await client.reptile.findOne({
      _id: reptileId,
      user: jwtBody.userId,
    });
    if (!userOwnsReptile) {
      return res.status(401).json({ error: "No access to the reptile" });
    }
    const records = await client.husbandryRecord.findMany({
      reptile: [reptileId],
    });
    return res.json({ records });
  };
