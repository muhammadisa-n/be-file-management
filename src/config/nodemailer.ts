import nodemailer from "nodemailer";
import { logger } from "../config/logger";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
  // logger: true
});

transporter.verify((error, success) => {
  if (error) {
    logger.error("❌ Failed Connect To Nodemailer", error);
  } else {
    logger.info("✅ Connected To Nodemailer", success);
  }
});

export default transporter;
