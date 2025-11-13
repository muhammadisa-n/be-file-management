import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";
import { logger } from "./logger";

if (
  env.CLOUDINARY_CLOUD_NAME &&
  env.CLOUDINARY_API_KEY &&
  env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
} else {
  logger.warn(
    "⚠️ Cloudinary config is incomplete. Skipping Cloudinary configuration."
  );
}

export { cloudinary };
