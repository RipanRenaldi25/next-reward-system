"use server";
import jwt from "jsonwebtoken";
import { prismaClient } from "../prismaClient";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

export const getUserLogin = async (acessToken) => {
  try {
    const decoded = jwt.decode(acessToken, "ACCESS_TOKEN_RAHASIA");
    const user = await prismaClient.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    return user;
  } catch (err) {
    console.log({ err });
  }
};

export const upload = async (formData, accessToken) => {
  const file = formData.get("image");
  const transportation = formData.get("transportation");

  if (!file) {
    throw new Error("No file uploaded");
  }

  const buffer = await file.arrayBuffer();
  const extension = file.name.split(".").pop();
  const fileName = `img-${Date.now()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, Buffer.from(buffer));

  const imageUrl = `/uploads/${fileName}`;
  console.log({ imageUrl });

  try {
    const decoded = jwt.verify(accessToken, "ACCESS_TOKEN_RAHASIA");

    await prismaClient.upload.create({
      data: {
        imageUrl,
        transport: transportation,
        userId: decoded.id,
      },
    });

    return { success: true, message: "Upload berhasil", imageUrl };
  } catch (err) {
    console.error("Upload error:", err);
    return { success: false, message: "Gagal mengunggah file" };
  }
};

export const getUserHistory = async (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, "ACCESS_TOKEN_RAHASIA");
    const user = await prismaClient.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      return {
        err: "user not found",
      };
    }
    const histories = await prismaClient.upload.findMany({
      where: {
        userId: user.id,
      },
    });
    return {
      data: histories,
      message: "history retrieved",
    };
  } catch (err) {
    return {
      err: "something error",
      message: err.messsage,
    };
  }
};

export const createAdmin = async () => {
  try {
    const isUserExists = await prismaClient.user.findUnique({
      where: {
        username: "admin",
      },
    });
    if (!!isUserExists) {
      return;
    }
    const password = await bcrypt.hash("password", 10);
    await prismaClient.user.create({
      data: {
        username: "admin",
        password: password,
        points: 0,
        role: "admin",
      },
    });
    console.log("ready");
  } catch (err) {
    console.log({ err });
  }
};

export const getAllUploads = async () => {
  try {
    const uploads = await prismaClient.upload.findMany({});
    return {
      data: uploads,
      message: "data retrieved",
    };
  } catch (err) {
    return { err: err.message };
  }
};

export const acceptReward = async (row) => {
  try {
    await prismaClient.$transaction(async (trx) => {
      await trx.upload.update({
        where: {
          id: row.id,
        },
        data: {
          status: "approved",
        },
      });
      const user = await trx.user.update({
        where: {
          id: row.userId,
        },
        data: {
          points: {
            increment: 10,
          },
        },
      });
    });
    return {
      message: "reward approved",
    };
  } catch (err) {
    return { err: err.message };
  }
};

export const reject = async (row) => {
  try {
    await prismaClient.$transaction(async (trx) => {
      await trx.upload.update({
        where: {
          id: row.id,
        },
        data: {
          status: "rejected",
        },
      });
    });
    return {
      message: "Reward rejected",
    };
  } catch (err) {
    return { err: err.message };
  }
};
