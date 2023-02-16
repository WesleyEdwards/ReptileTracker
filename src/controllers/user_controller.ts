import { controller } from "../lib/controller";
import { createUser, getAllUsers, loginUser } from "../dbQueries/users";

export const usersController = controller("users", [
  { path: "/", endpointBuilder: getAllUsers, method: "get" },
  { path: "/", method: "post", endpointBuilder: createUser, skipAuth: true },
  {
    path: "/login",
    method: "post",
    endpointBuilder: loginUser,
    skipAuth: true,
  },
]);
