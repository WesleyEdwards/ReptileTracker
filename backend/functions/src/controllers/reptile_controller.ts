import { controller } from "../lib/controller";
import {
  createReptile,
  updateReptile,
  deleteReptile,
  queryReptiles,
  reptileDetail,
} from "../dbQueries/reptiles";

export const reptilesController = controller("reptile", [
  { path: "/create", method: "post", endpointBuilder: createReptile },
  { path: "/:id", method: "get", endpointBuilder: reptileDetail },
  { path: "/", method: "post", endpointBuilder: queryReptiles },
  { path: "/:id", method: "put", endpointBuilder: updateReptile },
  { path: "/:id", method: "delete", endpointBuilder: deleteReptile },
]);
