import {
  toFileResponse,
  FileResponse,
  FileDetailResponse,
  toFileDetailResponse,
} from "../dtos/file-dto";
import { ResponseError } from "../utils/response-error";
import { Validation } from "../utils/validation";
import { FileRepository } from "../repositories/file-repository";
import { FileValidation } from "../validations/file-validation";
import { CloudinaryService } from "./cloudinary-service";
import { UploadedFile } from "express-fileupload";
import { UserRequest } from "../types/type-request";
import { env } from "../config/env";
import { FolderRepository } from "../repositories/folder-repository";
import { v4 as uuidv4 } from "uuid";
import { UserStorageRepository } from "../repositories/user-storage-repository";
export class FileService {
  static async create(
    req: UserRequest,
    file: UploadedFile
  ): Promise<FileResponse> {
    const data = Validation.validate(FileValidation.CREATE, req.body);
    if (!file) throw new ResponseError(400, "File wajib diupload");
    if (data.folder_id) {
      const folder = await FolderRepository.findById(data.folder_id);
      if (!folder || folder.owner_id !== req.user?.id) {
        throw new ResponseError(404, "Folder tidak ditemukan");
      }
    }
    const uploaded = await CloudinaryService.uploadFile(
      file,
      `${req.user?.uuid}-${req.user?.full_name}`
    );
    const storage = await UserStorageRepository.findByUserId(req.user!.id);
    if (!storage) throw new ResponseError(500, "User storage not found");
    if (storage.used + BigInt(file.size) > storage.quota) {
      throw new ResponseError(400, "Storage limit exceeded");
    }
    const uuid = uuidv4();
    try {
      const response = await FileRepository.create({
        uuid: uuid,
        name: file.name,
        type: file.mimetype,
        size: file.size,
        public_id: uploaded.public_id,
        folder_id: data.folder_id ? Number(data.folder_id) : null,
        owner_id: req.user?.id,
        url_download: `${env.BASE_API_URL}/files/${uuid}/download`,
        url_preview: `${env.BASE_API_URL}/files/${uuid}/stream`,
        url_cloudinary: uploaded.secure_url,
      });

      await UserStorageRepository.update(req.user!.id, {
        used: { increment: BigInt(file.size) },
      });
      return toFileResponse(response);
    } catch (err) {
      // rollback jika gagal simpan di DB
      await CloudinaryService.deleteFile(uploaded.public_id);
      throw err;
    }
  }

  static async detail(uuid: string): Promise<FileDetailResponse> {
    const file = await FileRepository.findByUUIDWithOwnerAndFolder(uuid);
    if (!file) throw new ResponseError(404, "File tidak ditemukan");
    return toFileDetailResponse(file);
  }

  static async stream(uuid: string, user_id?: number) {
    const file = await FileRepository.findByUUID(uuid);
    if (!file) throw new ResponseError(400, "File tidak ditemukan");
    if (user_id) {
      if (file.owner_id !== user_id) {
        throw new ResponseError(403, "Tidak punya akses ke file ini");
      }
    }
    const stream = await CloudinaryService.getStream(file.url_cloudinary);
    return { stream, file };
  }

  static async download(uuid: string, user_id?: number) {
    const file = await FileRepository.findByUUID(uuid);
    if (!file) throw new ResponseError(404, "File tidak ditemukan");
    if (user_id) {
      if (file.owner_id !== user_id) {
        throw new ResponseError(403, "Tidak punya akses ke file ini");
      }
    }
    const data = await CloudinaryService.downloadFile(file.url_cloudinary);
    return { data, file };
  }

  static async softDelete(uuid: string) {
    const file = await FileRepository.findByUUID(uuid);
    if (!file) {
      throw new ResponseError(404, "File tidak ditemukan");
    }
    // update deleted_at
    await FileRepository.softDelete(uuid);

    return file;
  }

  static async delete(req: UserRequest, uuid: string) {
    const file = await FileRepository.findByUUID(uuid);
    if (!file) {
      throw new ResponseError(404, "File tidak ditemukan");
    }
    if (file.owner_id !== req.user?.id) {
      throw new ResponseError(
        403,
        "Anda tidak memiliki izin untuk menghapus file ini"
      );
    }

    try {
      await CloudinaryService.deleteFile(file.public_id);
      await FileRepository.delete(file.id);
      await UserStorageRepository.update(req.user!.id, {
        used: { decrement: BigInt(file.size) },
      });
    } catch (error: any) {
      throw new ResponseError(500, "Gagal menghapus file: " + error.message);
    }
  }
}
