import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { AuthController } from "../controllers/auth-controller";
export const authRouter = express.Router();
authRouter.post("/api/auth/register", AuthController.register);
authRouter.post("/api/auth/login", AuthController.login);
authRouter.get("/api/auth/me", asyncHandler(authMiddleware), AuthController.me);
authRouter.post(
  "/api/auth/logout",
  asyncHandler(authMiddleware),
  AuthController.logout
);
