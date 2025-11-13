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
  const token = req.get("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json(errorResponse("Unauthorized: Access Token Tidak Valid.", 401));
  }
  const revoked = await prismaClient.revokedToken.findUnique({
    where: { token },
  });

  if (revoked) {
    return res
      .status(401)
      .json(errorResponse("Unauthorized: Access Token Tidak Valid.", 401));
  }
  let payload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET as string) as {
      user_uuid: string;
      user_email: string;
      user_full_name: string;
    };
  } catch (err) {
    throw new ResponseError(401, "Unauthorized: Access Token Tidak Valid.");
  }
  const user = await prismaClient.user.findUnique({
    where: { uuid: payload.user_uuid },
  });
  if (!user) {
    return res
      .status(401)
      .json(errorResponse("Unauthorized: Anda belum login", 401));
  }
  req.user = user;
  next();
};
