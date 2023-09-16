import { controller } from "../lib/controller";
import {
  createReptile,
  getReptiles,
  updateReptile,
  deleteReptile,
  getReptileById,
} from "../dbQueries/reptiles";

export const reptilesController = controller("reptiles", [
  { path: "/", method: "get", endpointBuilder: getReptiles },
  { path: "/", method: "post", endpointBuilder: createReptile },
  { path: "/:id", method: "get", endpointBuilder: getReptileById },
  { path: "/:id", method: "put", endpointBuilder: updateReptile },
  { path: "/:id", method: "delete", endpointBuilder: deleteReptile },
]);
