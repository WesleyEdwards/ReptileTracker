import { controller } from "../lib/controller";
import {
  createUser,
  getUser,
  getUserById,
  loginUser,
} from "../dbQueries/users";

export const usersController = controller("user", [
  { path: "/:id", method: "get", endpointBuilder: getUserById },
  { path: "/", method: "get", endpointBuilder: getUser },
  { path: "/", method: "post", endpointBuilder: createUser, skipAuth: true },
  {
    path: "/login",
    method: "post",
    endpointBuilder: loginUser,
    skipAuth: true,
  },
]);
