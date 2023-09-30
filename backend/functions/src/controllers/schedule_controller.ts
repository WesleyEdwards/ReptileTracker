import {controller} from "../lib/controller"
import {
  createSched,
  deleteSched,
  getSched,
  querySched,
  updateSched
} from "../dbQueries/schedules"

export const scheduleController = controller("schedule", [
  {path: "/:id", method: "post", endpointBuilder: createSched},
  {path: "/:id", method: "get", endpointBuilder: getSched},
  {path: "/", method: "post", endpointBuilder: querySched},
  {path: "/:id", method: "put", endpointBuilder: updateSched},
  {path: "/:id", method: "delete", endpointBuilder: deleteSched}
])
