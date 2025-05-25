"use server";
import { prismaClient } from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (state, formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  const isUserExist = await prismaClient.user.findUnique({
    where: {
      username,
    },
  });
  if (!!isUserExist) {
    return { error: "user already exists" };
  }
  const newPassword = await bcrypt.hash(password, 10);
  const user = await prismaClient.user.create({
    data: {
      username,
      password: newPassword,
      points: 0,
    },
  });

  return {
    message: "user created",
  };
};

export const login = async (state, formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  const isUserExist = await prismaClient.user.findUnique({
    where: {
      username,
    },
  });
  if (!isUserExist) {
    return { error: "user not found" };
  }
  const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
  if (!isPasswordMatch) {
    return {
      error: "Username or password is incorrect",
    };
  }
  const accessToken = jwt.sign(
    {
      ...isUserExist,
    },
    "ACCESS_TOKEN_RAHASIA"
  );

  return {
    accessToken,
    message: "Login success",
    role: isUserExist.role,
  };
};
