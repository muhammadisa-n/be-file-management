import { NextFunction, Response } from "express";
import { errorResponse } from "../utils/response";
import { prismaClient } from "../config/database";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types/type-request";
import { ResponseError } from "../utils/response-error";
import { env } from "../config/env";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    throw new ResponseError(401, "Unauthorized: Anda Belum Login.");
  }
  const token = req.get("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json(errorResponse("Unauthorized: Access Token Tidak Valid.", 401));
  }
  let payload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET as string) as {
      user_id: string;
      user_email: string;
      user_fullName: string;
    };
  } catch (err) {
    throw new ResponseError(401, "Unauthorized: Access Token Tidak Valid.");
  }
  const user = await prismaClient.user.findUnique({
    where: { id: payload.user_id },
  });
  if (!user) {
    return res
      .status(401)
      .json(errorResponse("Unauthorized: Anda belum login", 401));
  }
  req.user = user;
  next();
};
