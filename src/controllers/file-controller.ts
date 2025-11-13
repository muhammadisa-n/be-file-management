import { NextFunction, Response } from "express";
import { CreateFileRequest } from "../dtos/file-dto";
import {
  errorResponse,
  successResponse,
  successUpdateResponse,
} from "../utils/response";
import { FileService } from "../services/file-service";
import { UserRequest } from "../types/type-request";
import { UploadedFile } from "express-fileupload";
import fs from "fs";

export class FileController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const file = req.files?.file;
      if (!file) {
        res.status(400).json(errorResponse("File Belum Diupload", 400));
      }
      const fileUpload = Array.isArray(file) ? file[0] : file;
      const response = await FileService.create(
        req,
        fileUpload as UploadedFile
      );
      fs.unlink(fileUpload!.tempFilePath, (err) => {
        if (err) console.error("Gagal Hapus File Temp", err);
      });
      res
        .status(201)
        .json(successResponse("File Berhasil Diupload", 201, response));
    } catch (error) {
      next(error);
    }
  }

  static async stream(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const { stream, file } = await FileService.stream(uuid);

      res.setHeader("Content-Type", file.type || "application/octet-stream");
      res.setHeader("Content-Disposition", `inline; filename="${file.name}"`);
      res.setHeader("Cache-Control", "no-cache");
      if (stream) {
        stream.pipe(res);
      } else {
        res.status(404).json(errorResponse("Stream not found", 404));
      }
    } catch (error) {
      next(error);
    }
  }

  static async download(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const { data, file } = await FileService.download(uuid);

      res.setHeader("Content-Type", data.contentType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.name}"`
      );
      res.send(data.buffer);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      await FileService.delete(req, uuid);

      res.status(200).json(successResponse("File berhasil dihapus", 200));
    } catch (error) {
      next(error);
    }
  }
}
