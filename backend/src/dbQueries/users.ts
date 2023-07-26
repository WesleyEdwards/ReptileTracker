import { createUserToken, creationDates } from "../helperFunctions";
import bcrypt from "bcrypt";
import { ReqBuilder } from "../middleware/auth_types";
import { LoginBody } from "./request_types";
import { isCreateUserBody, isLoginBody } from "../json_validation/request_body";

// Create
export const createUser: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isCreateUserBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const emailExists = await client.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const { email, firstName, lastName } = body;
    const user = await client.user.create({
      data: {
        email,
        firstName,
        lastName,
        ...creationDates,
        passwordHash,
      },
    });
    // now we log the user in and return the user and token
    const token = createUserToken(user.id);
    res.json({ user, token });
  };

// Get
export const getUserById: ReqBuilder =
  (client) =>
  async ({ jwtBody, params }, res) => {
    const userId = parseInt(params.id);
    if (userId !== jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });

    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });
    res.json({ user });
  };

export const getUser: ReqBuilder =
  (client) =>
  async ({ jwtBody, params }, res) => {
    const user = await client.user.findFirst({
      where: {
        id: jwtBody?.userId,
      },
    });
    res.json({ user });
  };

export const loginUser: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isLoginBody(body)) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }
    const { email, password } = body;
    const user = await client.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      // means the password was incorrect
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }
    const token = createUserToken(user.id);
    res.json({ user, token });
  };
