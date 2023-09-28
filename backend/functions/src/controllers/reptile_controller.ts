import { controller } from "../lib/controller";
import {
  createReptile,
  getReptiles,
  updateReptile,
  deleteReptile,
  getReptileById,
  queryReptiles,
} from "../dbQueries/reptiles";

export const reptilesController = controller("reptile", [
  { path: "/create", method: "post", endpointBuilder: createReptile },
  { path: "/", method: "get", endpointBuilder: getReptiles },
  { path: "/", method: "post", endpointBuilder: queryReptiles },
  { path: "/:id", method: "get", endpointBuilder: getReptileById },
  { path: "/:id", method: "put", endpointBuilder: updateReptile },
  { path: "/:id", method: "delete", endpointBuilder: deleteReptile },
]);
