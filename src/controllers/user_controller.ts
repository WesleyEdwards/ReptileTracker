import { controller } from "../lib/controller";
import { createUser, getUser, loginUser } from "../dbQueries/users";

export const usersController = controller("user", [
  { path: "/", endpointBuilder: getUser, method: "get" },
  { path: "/", method: "post", endpointBuilder: createUser, skipAuth: true },
  {
    path: "/login",
    method: "post",
    endpointBuilder: loginUser,
    skipAuth: true,
  },
]);
