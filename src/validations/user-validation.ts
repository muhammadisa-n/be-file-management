import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    fullName: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Nama Lengkap Wajib Diisi",
        })
        .min(1, { message: "Nama Lengkap Tidak Boleh Kosong" })
        .max(100, { message: "Nama Lengkap Maksimal 100 Karakter" })
    ),
    email: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Email Wajib Diisi",
        })
        .min(1, { message: "Email Tidak Boleh Kosong" })
        .max(100, { message: "Email Maksimal 100 Karakter" })
        .email({ message: "Format Email Tidak Valid" })
    ),
    password: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Kata Sandi Wajib Diisi",
        })
        .min(8, { message: "Kata Sandi Minimal 8 Karakter" })
        .max(100, { message: "Kata Sandi Maksimal 100 Karakter" })
    ),
    as: z.string().optional(),
  });

  static readonly CREATE: ZodType = z.object({
    fullName: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Nama Lengkap Wajib Diisi",
        })
        .min(1, { message: "Nama Lengkap Tidak Boleh Kosong" })
        .max(100, { message: "Nama Lengkap Maksimal 100 Karakter" })
    ),
    email: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Email Wajib Diisi",
        })
        .min(1, { message: "Email Tidak Boleh Kosong" })
        .max(100, { message: "Email Maksimal 100 Karakter" })
        .email({ message: "Format email tidak valid" })
    ),
    password: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Kata Sandi Wajib Diisi",
        })
        .min(8, { message: "Kata Sandi Minimal 8 Karakter" })
        .max(100, { message: "Kata Sandi Maksimal 100 Karakter" })
    ),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Username Atau Email Wajib Diisi",
        })
        .min(1, { message: "Username Atau Email Tidak Boleh Kosong" })
        .max(100, { message: "Username Atau Email Maksimal 100 Karakter" })
    ),
    password: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Password Wajib Diisi",
        })
        .min(1, { message: "Password Minimal 1 Karakter" })
        .max(100, { message: "Password Maksimal 100 Karakter" })
    ),
    redirect_url: z.preprocess(
      (v) => (v === null ? undefined : v),
      z
        .string({
          required_error: "Redirect URL Wajib Diisi",
        })
        .optional()
    ),
    rememberMe: z.boolean().default(false).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    fullName: z
      .string({
        required_error: "Nama Lengkap Wajib Diisi",
      })
      .min(1, { message: "Nama Lengkap Tidak Boleh Kosong" })
      .max(100, { message: "Nama Lengkap Maksimal 100 Karakter" }),
    email: z
      .string({
        required_error: "Email Wajib Diisi",
      })
      .min(1, { message: "Email minimal 1 Karakter" })
      .max(100, { message: "Email Maksimal 100 Karakter" })
      .email({ message: "Format email tidak valid" })
      .optional(),
    password: z
      .string({
        required_error: "Password Wajib Diisi",
      })
      .min(8, { message: "Password minimal 8 Karakter" })
      .max(500, { message: "Password Maksimal 500 Karakter" })
      .optional(),
  });

  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
  });
}
