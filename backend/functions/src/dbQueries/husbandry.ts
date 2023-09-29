import { creationDates, getCurrentDateTime } from "../helperFunctions";
import { isCreateHusbandryBody } from "../json_validation/request_body";
import { ReqBuilder } from "../lib/auth_types";

export const createHusbandry: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isCreateHusbandryBody(body)) {
      return res
        .status(400)
        .json({ error: "Invalid parameters for creating Husbandry" });
    }
    const husbandry = await client.husbandryRecord.createOne({
      ...body,
      ...creationDates(),
    });
    return res.json(husbandry);
  };

export const husbandryDetail: ReqBuilder =
  (client) =>
  async ({ params }, res) => {
    const husbandry = await client.husbandryRecord.findOne({
      _id: params.id,
    });
    if (!husbandry)
      return res.json({ error: "Please use a husbandryID that exists" });

    return res.json(husbandry);
  };

export const queryHusbandry: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    const husbandry = await client.husbandryRecord.findMany(body);
    return res.json(husbandry);
  };

export const updateHusbandry: ReqBuilder =
  (client) =>
  async ({ params, body }, res) => {
    const exists = await client.husbandryRecord.findOne({ _id: params.id });

    if (!exists) return res.status(404).json("Husbandry does not exist");

    const reptilePartial = body;
    const husbandry = await client.husbandryRecord.updateOne({
      ...reptilePartial,
      updatedAt: getCurrentDateTime(),
    });
    return res.json(husbandry);
  };

export const deleteHusbandry: ReqBuilder =
  (client) =>
  async ({ params }, res) => {
    const exists = await client.husbandryRecord.findOne({
      _id: params.id,
    });
    if (!exists) {
      return res.json({ error: "Please use a reptileID that exists" });
    }
    await client.husbandryRecord.deleteOne(exists._id);
    return res.json({ message: `Deleted the husbandry with id ${exists._id}` });
  };
