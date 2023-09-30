import {controller} from "../lib/controller"
import {
  husbandryDetail,
  createHusbandry,
  queryHusbandry,
  updateHusbandry,
  deleteHusbandry
} from "../dbQueries/husbandry"

export const recordController = controller("husbandry", [
  {path: "/create", method: "post", endpointBuilder: createHusbandry},
  {path: "/:id", method: "get", endpointBuilder: husbandryDetail},
  {path: "/", method: "post", endpointBuilder: queryHusbandry},
  {path: "/:id", method: "put", endpointBuilder: updateHusbandry},
  {path: "/:id", method: "delete", endpointBuilder: deleteHusbandry}
])
