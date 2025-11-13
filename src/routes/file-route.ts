import express from "express";
import { FileController } from "../controllers/file-controller";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

export const fileRouter = express.Router();

fileRouter.post(
  "/api/files",
  asyncHandler(authMiddleware),
  FileController.create
);

fileRouter.get(
  "/api/files/:uuid",
  // asyncHandler(authMiddleware),
  FileController.detail
);
fileRouter.get(
  "/api/files/:uuid/stream",
  asyncHandler(authMiddleware),
  FileController.stream
);

fileRouter.get(
  "/api/files/:uuid/download",
  asyncHandler(authMiddleware),
  FileController.download
);

fileRouter.patch(
  "/api/files/:uuid/delete",
  asyncHandler(authMiddleware),
  FileController.softDelete
);

fileRouter.delete(
  "/api/files/:uuid",
  asyncHandler(authMiddleware),
  FileController.delete
);
