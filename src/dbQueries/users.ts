import { RequestHandler } from "express";
import { client } from "..";
import { getCurrentDateTime } from "../helperFunctions";
import { isCreateUserBody } from "../inputHelpers";

export const createUser: RequestHandler = async (req, res) => {
  if (!isCreateUserBody(req.body)) {
    return res.status(400).json({ error: "Invalid user Input" });
  }
  const { firstName, lastName, email, passwordHash } = req.body;
  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  const user = await client.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      createdAt,
      updatedAt,
    },
  });
  res.json({ user });
};

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await client.user.findMany();
  res.json({ users });
};
