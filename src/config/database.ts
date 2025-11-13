import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";
import { DateTime } from "luxon";
import { dbLogger } from "./logger";
import { env } from "./env";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$use(async (params, next) => {
  const result = await next(params);

  const convertToYourTimeZone = (date: unknown): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    return DateTime.fromJSDate(date)
      .setZone(env.TZ || "UTC")
      .toFormat(env.DATETIME_FORMAT);
  };

  const transformDates = (item: any): any => {
    if (!item) return item;

    if (Array.isArray(item)) {
      return item.map(transformDates);
    }

    if (typeof item === "object") {
      const newItem: any = { ...item };
      for (const key in newItem) {
        const value = newItem[key];
        if (
          ["created_at", "updated_at", "deleted_at"].includes(key) &&
          value instanceof Date
        ) {
          newItem[key] = convertToYourTimeZone(value);
        } else if (typeof value === "object" && value !== null) {
          newItem[key] = transformDates(value);
        }
      }
      return newItem;
    }

    return item;
  };

  return transformDates(result);
});

prismaClient.$on("query", (e) => {
  dbLogger.info(`${e.query} - ${e.params}`);
});
prismaClient.$on("warn", (e) => {
  logger.warn(e);
});
prismaClient.$on("info", (e) => {
  logger.info(e);
});
prismaClient.$on("error", (e) => {
  logger.error(e);
});
export const connectDatabase = async () => {
  try {
    await prismaClient.$connect();
    logger.info("✅ Connected Database");
  } catch (error) {
    logger.error("❌ Failed Connect To Database", error);
    throw error;
  }
};
