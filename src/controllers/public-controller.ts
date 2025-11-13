import { NextFunction, Response, Request } from "express";
import { errorResponse } from "../utils/response";
import { FileService } from "../services/file-service";

export class PublicController {
  static async stream(req: Request, res: Response, next: NextFunction) {
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

  static async download(req: Request, res: Response, next: NextFunction) {
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
}
