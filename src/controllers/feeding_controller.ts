import { controller } from "../lib/controller";
import { createFeeding, getAllFeedings } from "../dbQueries/feeding";

export const feedingController = controller("record", [
  { path: "/:id", method: "get", endpointBuilder: getAllFeedings },
  { path: "/", method: "post", endpointBuilder: createFeeding },
]);
