import { controller } from "../lib/controller";
import {
  createSchedule,
  getScheduleByReptile,
  getScheduleByUser,
} from "../dbQueries/schedules";

export const scheduleController = controller("schedules", [
  {
    path: "/:id",
    method: "post",
    endpointBuilder: createSchedule,
  },
  {
    path: "/user/:id",
    method: "get",
    endpointBuilder: getScheduleByUser,
  },
  {
    path: "/:id",
    method: "get",
    endpointBuilder: getScheduleByReptile,
  },
]);
