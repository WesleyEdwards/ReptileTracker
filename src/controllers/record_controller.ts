import { controller } from "../lib/controller";
import { getAllRecords, createHusbandryRecord } from "../dbQueries/husbandry";

export const recordController = controller("record", [
  { path: "/:id", method: "get", endpointBuilder: getAllRecords },
  { path: "/", method: "post", endpointBuilder: createHusbandryRecord },
]);
