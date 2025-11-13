import { Request, Response, NextFunction } from "express";
import { httpAccessLogger } from "../config/logger";

export const httpLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(3);

    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} ${timeInMs} ms - ${res.get("Content-Length") || 0}`;

    if (res.statusCode >= 200 && res.statusCode < 300) {
      httpAccessLogger.info(logMessage);
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      httpAccessLogger.info(logMessage);
    } else if (res.statusCode >= 400 && res.statusCode < 500) {
      httpAccessLogger.warn(logMessage);
    } else if (res.statusCode >= 500) {
      httpAccessLogger.error(logMessage);
    } else {
      httpAccessLogger.debug(logMessage);
    }
  });

  next();
};
