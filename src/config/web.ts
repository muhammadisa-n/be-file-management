import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./env";

import { errorMiddleware } from "../middleware/error-middleware";
import { httpLogger } from "../middleware/http-logger-middleware";
import { errorResponse } from "../utils/response";
import { mainRouter } from "../routes/main-route";

export const web = express();

// Middleware
web.use(express.json());
web.use(cookieParser());
web.use(
  cors({
    origin: env.CLIENT_URLS,
    credentials: true,
  })
);
web.use(fileUpload({ useTempFiles: true, tempFileDir: "./temp/" }));
web.use(express.static("public"));
web.use(httpLogger);

// Routes
web.use(mainRouter);

// 404 Handler
web.use((req, res) => {
  res.status(404).json(errorResponse("Request Tidak Ada", 404));
});

// Global Error Handler
web.use(errorMiddleware);
