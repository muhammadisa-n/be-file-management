import { z, ZodType } from "zod";

export class FileValidation {
  static readonly CREATE: ZodType = z.object({
    folder_id: z
      .preprocess(
        (v) => (v === "" || v === null ? undefined : Number(v)),
        z.number().int().positive().optional()
      )
      .optional()
      .nullable(),
  });

  static readonly DELETE: ZodType = z.object({
    uuid: z
      .string({
        required_error: "UUID wajib diisi",
      })
      .uuid({ message: "Format UUID tidak valid" }),
  });

  static readonly LIST: ZodType = z.object({
    page: z.number().min(1).positive(),
    take: z.number().min(1).positive(),
    skip: z.number(),
    name: z.string().optional(),
    order: z.string().optional(),
  });
}
