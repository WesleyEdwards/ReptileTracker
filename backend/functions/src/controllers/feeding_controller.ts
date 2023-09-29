import {controller} from "../lib/controller"
import {
  createFeeding,
  feedingDetail,
  queryFeedings,
  updateFeeding,
  deleteFeeding
} from "../dbQueries/feeding"

export const feedingController = controller("feeding", [
  {path: "/create", method: "post", endpointBuilder: createFeeding},
  {path: "/:id", method: "get", endpointBuilder: feedingDetail},
  {path: "/", method: "post", endpointBuilder: queryFeedings},
  {path: "/:id", method: "put", endpointBuilder: updateFeeding},
  {path: "/:id", method: "delete", endpointBuilder: deleteFeeding}
])
