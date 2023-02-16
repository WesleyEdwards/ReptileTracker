import { creationDates } from "../helperFunctions";
import { isCreateFeedingBody } from "../json_validation/validationFunctions";
import { ReqBuilder } from "../middleware/auth_types";

// Create
export const createFeeding: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isCreateFeedingBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const feeding = await client.feeding.create({
      data: {
        ...body,
        ...creationDates,
      },
    });
    res.json({ feeding });
  };

// Get
export const getAllFeedings: ReqBuilder = (client) => async (req, res) => {
  const reptileId = parseInt(req.params.id);
  const feedings = await client.feeding.findMany({
    where: {
      reptileId: reptileId,
    },
  });
  res.json({ feedings });
};
