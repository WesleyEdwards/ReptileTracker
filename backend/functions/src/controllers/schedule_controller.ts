import { controller } from "../lib/controller";
import {
  createSchedule,
  getSchedule,
  getScheduleByReptile,
  getScheduleByUser,
  updateSchedule,
} from "../dbQueries/schedules";

export const scheduleController = controller("schedules", [
  {
    path: "/:id",
    method: "post",
    endpointBuilder: createSchedule,
  },
  {
    path: "/:id",
    method: "get",
    endpointBuilder: getSchedule,
  },
  {
    path: "/user/:id",
    method: "get",
    endpointBuilder: getScheduleByUser,
  },
  {
    path: "/reptile/:id",
    method: "get",
    endpointBuilder: getScheduleByReptile,
  },
  {
    path: "/:id",
    method: "put",
    endpointBuilder: updateSchedule,
  },
]);
