import { Request, Response, NextFunction } from "express";
import { httpAccessLogger } from "../config/logger";
import chalk from "chalk";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(3);

    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} ${timeInMs} ms - ${res.get("Content-Length") || 0}`;

    let level: "info" | "warn" | "error" | "debug";

    if (res.statusCode >= 500) {
      level = "error";
    } else if (res.statusCode >= 400) {
      level = "warn";
    } else {
      level = "info";
    }

    // Tag method untuk konsol
    const methodColors: Record<string, string> = {
      GET: chalk.green.bold("GET"),
      POST: chalk.cyan.bold("POST"),
      PUT: chalk.yellow.bold("PUT"),
      PATCH: chalk.magenta.bold("PATCH"),
      DELETE: chalk.red.bold("DELETE"),
      OPTIONS: chalk.white.bold("OPTIONS"),
      HEAD: chalk.gray.bold("HEAD"),
    };

    const methodColored = methodColors[req.method] || req.method;
    const coloredMessage = logMessage.replace(req.method, methodColored);

    // Kirim ke logger
    switch (level) {
      case "info":
        httpAccessLogger.info(coloredMessage);
        break;
      case "warn":
        httpAccessLogger.warn(coloredMessage);
        break;
      case "error":
        httpAccessLogger.error(coloredMessage);
        break;
      default:
        httpAccessLogger.debug(coloredMessage);
        break;
    }
  });

  next();
};
