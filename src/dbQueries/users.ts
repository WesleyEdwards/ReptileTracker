import { RequestHandler } from "express";
import { client } from "..";
import { getCurrentDateTime } from "../helperFunctions";
import { isCreateUserBody } from "../validationFunctions";

// Create
export const createUser: RequestHandler = async ({ body }, res) => {
  if (!isCreateUserBody(body)) {
    return res.status(400).json({ error: "Invalid user Input" });
  }
  const createdAt = getCurrentDateTime();
  const updatedAt = createdAt;
  const user = await client.user.create({
    data: {
      ...body,
      createdAt,
      updatedAt,
    },
  });
  res.json({ user });
};

// Get
export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await client.user.findMany();
  res.json({ users });
};
