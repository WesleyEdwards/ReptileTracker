import { controller } from "../lib/controller";
import {
  createSchedule,
  getAllSchedules,
  getScheduleByReptile,
  getScheduleByUser,
} from "../dbQueries/schedules";

export const scheduleController = controller("schedules", [
  {
    path: "/",
    method: "post",
    endpointBuilder: createSchedule,
  },
  {
    path: "/",
    method: "get",
    endpointBuilder: getAllSchedules,
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
