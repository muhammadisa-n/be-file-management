import winston from "winston";
import chalk from "chalk";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  const formattedMessage =
    typeof message === "object" ? JSON.stringify(message, null, 2) : message;

  let coloredLevel = level.toUpperCase();

  switch (level) {
    case "error":
      coloredLevel = chalk.redBright.bold(level.toUpperCase());
      break;
    case "warn":
      coloredLevel = chalk.yellowBright.bold(level.toUpperCase());
      break;
    case "info":
      coloredLevel = chalk.greenBright.bold(level.toUpperCase());
      break;
    case "debug":
      coloredLevel = chalk.bgBlueBright.bold(level.toUpperCase());
      break;
    default:
      coloredLevel = chalk.bgBlueBright.bold(level.toUpperCase());
      break;
  }

  return `[${chalk.gray(timestamp)}] ${coloredLevel} - ${formattedMessage}`;
});

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),
  transports: [new winston.transports.Console()],
});

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const dbLogger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, "database-log-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "30d",
      maxSize: "10m",
    }),
  ],
});

// Format untuk FILE logs — tanpa warna
const plainFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const coloredHttpFormat = winston.format.printf(
  ({ timestamp, level, message }) => {
    const msg = String(message);

    let coloredLevel = level.toUpperCase();
    switch (level) {
      case "error":
        coloredLevel = chalk.redBright.bold(level.toUpperCase());
        break;
      case "warn":
        coloredLevel = chalk.yellowBright.bold(level.toUpperCase());
        break;
      case "info":
        coloredLevel = chalk.greenBright.bold(level.toUpperCase());
        break;
      case "debug":
        coloredLevel = chalk.blueBright.bold(level.toUpperCase());
        break;
      default:
        coloredLevel = chalk.whiteBright(level.toUpperCase());
        break;
    }

    // Pewarnaan method HTTP
    const methodMatch = msg.match(/^(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD)/);
    const methodColors = {
      GET: chalk.green.bold("GET"),
      POST: chalk.cyan.bold("POST"),
      PUT: chalk.yellow.bold("PUT"),
      DELETE: chalk.red.bold("DELETE"),
      PATCH: chalk.magenta.bold("PATCH"),
      OPTIONS: chalk.white.bold("OPTIONS"),
      HEAD: chalk.gray.bold("HEAD"),
    } as const;

    let coloredMessage = msg;
    if (methodMatch) {
      const method = methodMatch[0] as keyof typeof methodColors;
      coloredMessage = msg.replace(method, methodColors[method]);
    }

    return `[${chalk.gray(timestamp)}] ${coloredLevel}: ${coloredMessage}`;
  }
);

export const httpAccessLogger = winston.createLogger({
  level: "debug",
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, "access-log-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxFiles: "30d",
      maxSize: "10m",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        plainFormat
      ),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        coloredHttpFormat
      ),
    }),
  ],
});
