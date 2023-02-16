import { controller } from "../lib/controller";
import {
  getReptileRecords,
  createHusbandryRecord,
} from "../dbQueries/husbandry";

export const recordController = controller("record", [
  { path: "/:id", method: "get", endpointBuilder: getReptileRecords },
  { path: "/", method: "post", endpointBuilder: createHusbandryRecord },
]);
