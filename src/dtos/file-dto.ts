import { File } from "@prisma/client";
export type CreateFileRequest = {
  folder_id?: string | null;
};

export type FileResponse = {
  uuid: string;
  name: string;
  type: string;
  size: number;
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
    size: file.size,
    folder_id: file.folder_id,
    owner_id: file.owner_id,
    created_at: file.created_at,
    updated_at: file.updated_at,
    deleted_at: file.deleted_at,
    url_preview: file.url_preview,
    url_download: file.url_download,
  };
}
