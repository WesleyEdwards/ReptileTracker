import { creationDates } from "../helperFunctions";
import { isCreateHusbandryBody } from "../json_validation/request_body";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createHusbandryRecord: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isCreateHusbandryBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }

    const reptileExists = await client.reptile.findFirst({
      where: { id: body.reptileId },
    });
    if (!reptileExists) {
      return res.json({ error: "Invalid Reptile Id" });
    }
    const husbandryRecord = await client.husbandryRecord.create({
      data: {
        ...body,
        ...creationDates,
      },
    });
    res.json({ husbandryRecord });
  };

// Get
export const getReptileRecords: ReqBuilder = (client) => async (req, res) => {
  const reptileId = parseInt(req.params.id);
  const records = await client.husbandryRecord.findMany({
    where: {
      reptileId: reptileId,
    },
  });
  res.json({ records });
};
