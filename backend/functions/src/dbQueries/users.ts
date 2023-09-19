import { createUserToken, creationDates } from "../helperFunctions";
import bcrypt from "bcrypt";
import { ReqBuilder } from "../middleware/auth_types";
import { isCreateUserBody, isLoginBody } from "../json_validation/request_body";

export const createUser: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isCreateUserBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    // const emailExists = await client.user.findOne({
    //   email: body.email,
    // });
    // if (emailExists) {
    //   return res.status(400).json({ error: "Email already exists" });
    // }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const { email, firstName, lastName } = body;
    const newUser = {
      email,
      firstName,
      lastName,
      passwordHash,
      ...creationDates,
    };
    const user = await client.user.createOne(newUser);
    if (!user) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const token = createUserToken(user._id);
    return res.json({ user, token });
  };

export const getUserById: ReqBuilder =
  (client) =>
  async ({ jwtBody, params }, res) => {
    if (params.id !== jwtBody?.userId)
      return res.status(401).json({ error: "Unauthorized" });

    const user = await client.user.findOne({
      _id: params.id,
    });
    return res.json({ user });
  };

export const getUser: ReqBuilder =
  (client) =>
  async ({ jwtBody }, res) => {
    const user = await client.user.findOne({
      id: jwtBody?.userId,
    });
    return res.json({ user });
  };

export const loginUser: ReqBuilder =
  (client) =>
  async ({ body }, res) => {
    if (!isLoginBody(body)) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }
    const { email, password } = body;
    const user = await client.user.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }
    const token = createUserToken(user._id);
    return res.json({ user, token });
  };
