import { cloudinary } from "../config/cloudinary";
import { ResponseError } from "../utils/response-error";
import fetch from "node-fetch";

export class CloudinaryService {
  // Upload satu file

  static async uploadFile(file: any, path = "file-management") {
    if (!file || !file.tempFilePath) {
      throw new ResponseError(
        400,
        "File tidak ditemukan atau path tidak valid"
      );
    }

    try {
      const folderName = `file-management/${path
        .replace(/\s+/g, "_")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9_]/g, "")}`;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: folderName,
        resource_type: "auto",
      });
      return result; // { secure_url, public_id, ... }
    } catch (error: any) {
      throw new ResponseError(
        500,
        "Gagal upload ke Cloudinary: " + error.message
      );
    }
  }

  // Upload banyak file sekaligus
  static async uploadMultipleFiles(files: any[], path = "file-management") {
    if (!files || files.length === 0) {
      throw new ResponseError(400, "Tidak ada file untuk diupload");
    }

    try {
      const folderName = `file-management/${path
        .replace(/\s+/g, "_")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9_]/g, "")}`;
      const uploads = files.map((file) =>
        cloudinary.uploader.upload(file.tempFilePath, {
          folder: folderName,
          resource_type: "auto",
        })
      );

      const results = await Promise.all(uploads);
      return results; // array of hasil upload
    } catch (error: any) {
      throw new ResponseError(
        500,
        "Gagal upload multiple file: " + error.message
      );
    }
  }

  // Hapus file
  static async deleteFile(publicId: string) {
    if (!publicId) throw new ResponseError(400, "public_id tidak valid");

    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok" && result.result !== "not found") {
      throw new ResponseError(500, "Gagal menghapus file di Cloudinary");
    }
    return result;
  }

  // Hapus banyak file sekaligus
  static async deleteMultipleFiles(publicIds: string[]) {
    if (!publicIds || publicIds.length === 0) {
      throw new ResponseError(400, "Tidak ada public_id yang diberikan");
    }

    const deletions = publicIds.map((id) => cloudinary.uploader.destroy(id));
    const results = await Promise.all(deletions);
    return results;
  }

  // Stream file dari URL Cloudinary
  static async getStream(fileUrl: string) {
    if (!fileUrl) throw new ResponseError(400, "URL file tidak valid");

    const response = await fetch(fileUrl);
    if (!response.ok)
      throw new ResponseError(404, "File tidak ditemukan di Cloudinary");

    return response.body; // stream Readable
  }

  // Download file jadi buffer
  static async downloadFile(fileUrl: string) {
    if (!fileUrl) throw new ResponseError(400, "URL file tidak valid");

    const response = await fetch(fileUrl);
    if (!response.ok)
      throw new ResponseError(404, "File tidak ditemukan di Cloudinary");

    const buffer = Buffer.from(await response.arrayBuffer());
    return {
      buffer,
      contentType:
        response.headers.get("content-type") || "application/octet-stream",
      contentLength: response.headers.get("content-length") || "0",
    };
  }
}
