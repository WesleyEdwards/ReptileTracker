import { RequestHandler } from "express";
import { createUserToken, getCurrentDateTime } from "../helperFunctions";
import { isCreateUserBody } from "../validationFunctions";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { LoginBody } from "../types";

// Create
export const createUser =
  (client: PrismaClient): RequestHandler =>
  async ({ body }, res) => {
    if (!isCreateUserBody(body)) {
      return res.status(400).json({ error: "Invalid user Input" });
    }
    const createdAt = getCurrentDateTime();
    const updatedAt = createdAt;
    const passwordHash = await bcrypt.hash(body.password, 10);
    const { email, firstName, lastName } = body;
    const user = await client.user.create({
      data: {
        email,
        firstName,
        lastName,
        createdAt,
        updatedAt,
        passwordHash,
      },
    });
    // now we log the user in and return the user and token
    const token = createUserToken(user.id);
    res.json({ user, token });
  };

// Get
export const getAllUsers =
  (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const users = await client.user.findMany();
    res.json({ users });
  };

export const loginUser =
  (client: PrismaClient): RequestHandler =>
  async (req, res) => {
    const { email, password } = req.body as LoginBody;
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
    res.json({
      user,
      token,
    });
  };
