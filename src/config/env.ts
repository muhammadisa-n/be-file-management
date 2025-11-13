import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  APP_NAME: z.string().default("Craft JS"),
  APP_SECRET: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  TZ: z.string().default("Asia/Jakarta"),
  DATETIME_FORMAT: z.string().default("dd-MM-yyyy HH:mm:ss"),
  DATABASE_URL: z
    .string()
    .url({ message: "DATABASE_URL harus URL yang valid" }),
  BASE_URL: z.string().url(),
  BASE_API_URL: z.string().url(),
  CLIENT_URL: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return val.split(",").every((url) => {
          try {
            new URL(url.trim());
            return true;
          } catch {
            return false;
          }
        });
      },
      {
        message:
          "CLIENT_URL harus berupa URL valid, dipisah koma jika lebih dari satu",
      }
    ),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  MAIL_HOST: z.string().optional(),
  MAIL_PORT: z.string().optional().default("587"),
  MAIL_USER: z.string().optional(),
  MAIL_PASS: z.string().optional(),
  MAIL_FROM: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ ENV ERROR:", _env.error.format());
  process.exit(1);
}

export const parsed = _env.data;
export const env = {
  ...parsed,
  CLIENT_URLS: parsed.CLIENT_URL
    ? parsed.CLIENT_URL.split(",").map((url) => url.trim())
    : [
        "http://localhost:8000",
        "http://localhost:5173",
        "http://localhost:3333",
        "http://localhost:3000",
      ],
};
