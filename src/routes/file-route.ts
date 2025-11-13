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

// userRouter.get(
//   "/api/users",
//   asyncHandler(authMiddleware),
//   FileController.getAll
// );
fileRouter.get(
  "/api/files/:uuid",
  // asyncHandler(authMiddleware),
  FileController.stream
);

fileRouter.get(
  "/api/files/:uuid/download",
  // asyncHandler(authMiddleware),
  FileController.download
);

fileRouter.delete(
  "/api/files/:id",
  asyncHandler(authMiddleware),
  FileController.delete
);
