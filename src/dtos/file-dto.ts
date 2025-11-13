import { File, User, Folder } from "@prisma/client";
import { convertSize } from "../utils/convertSize";
export type CreateFileRequest = {
  folder_id?: string | null;
};

export type FileResponse = {
  uuid: string;
  name: string;
  type: string;
  size: string;
  is_public: boolean;
  folder_id?: number | null;
  owner_id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  url_preview: string;
  url_download: string;
};

export function toFileResponse(file: File): FileResponse {
  return {
    uuid: file.uuid,
    name: file.name,
    type: file.type,
    size: convertSize(Number(file.size)),
    is_public: file.is_public,
    folder_id: file.folder_id,
    owner_id: file.owner_id,
    created_at: file.created_at,
    updated_at: file.updated_at,
    deleted_at: file.deleted_at,
    url_preview: file.url_preview,
    url_download: file.url_download,
  };
}

// DTO untuk folder dengan parent rekursif
export type FolderDetailResponse = {
  id: number;
  uuid: string;
  name: string;
  owner: {
    uuid: string;
    full_name: string;
    email: string;
  };
  parent?: FolderDetailResponse | null; // parent bisa null
};

// DTO file detail
export type FileDetailResponse = {
  id: number;
  uuid: string;
  name: string;
  type: string;
  size: string;
  is_public: boolean;
  folder?: FolderDetailResponse | null;
  owner: {
    uuid: string;
    full_name: string;
    email: string;
  };
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  url: {
    preview: string;
    download: string;
    cloudinary: string;
  };
};

// Mapper rekursif folder
function mapFolder(
  folder: Folder & { owner: User; parent?: Folder | null }
): FolderDetailResponse {
  return {
    id: folder.id,
    uuid: folder.uuid,
    name: folder.name,
    owner: {
      uuid: folder.owner.uuid,
      full_name: folder.owner.full_name,
      email: folder.owner.email,
    },
    parent: folder.parent
      ? mapFolder(folder.parent as Folder & { owner: User })
      : null,
  };
}

// Mapper file detail
export function toFileDetailResponse(
  file: File & {
    folder?: (Folder & { owner: User; parent?: Folder | null }) | null;
    owner: User;
  }
): FileDetailResponse {
  return {
    id: file.id,
    uuid: file.uuid,
    name: file.name,
    type: file.type,
    size: convertSize(Number(file.size)),
    is_public: file.is_public,
    folder: file.folder ? mapFolder(file.folder) : null,
    owner: {
      uuid: file.owner.uuid,
      full_name: file.owner.full_name,
      email: file.owner.email,
    },
    created_at: file.created_at,
    updated_at: file.updated_at,
    deleted_at: file.deleted_at,
    url: {
      preview: file.url_preview,
      download: file.url_download,
      cloudinary: file.url_cloudinary,
    },
  };
}
