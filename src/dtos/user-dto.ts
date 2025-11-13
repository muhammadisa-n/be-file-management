import { User } from "@prisma/client";
import { convertSize } from "../utils/convertSize";
export type loginRequest = {
  email: string;
  password: string;
};
export type CreateUserRequest = {
  full_name: string;
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  full_name?: string;
  email?: string;
  password?: string;
};

export type ListUserRequest = {
  page: number;
  take: number;
  skip: number;
  name?: string;
};
export type UserDetailResponse = {
  uuid: string;
  full_name: string;
  email: string;
  image_id?: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};

export type UserResponse = {
  uuid: string;
  full_name: string;
  email: string;
};

export function toUserDetailResponse(user: User): UserDetailResponse {
  return {
    uuid: user.uuid,
    full_name: user.full_name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    deleted_at: user.deleted_at!,
  };
}
export function toUserResponse(user: User): UserResponse {
  return {
    uuid: user.uuid,
    full_name: user.full_name,
    email: user.email,
  };
}

type UserWithStorage = {
  id: number;
  uuid: string;
  full_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  user_storage?: {
    uuid: string;
    quota: bigint;
    used: bigint;
    plan: string;
  } | null;
};

export type UserDetailWithStorageResponse = {
  uuid: string;
  full_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  storage?: {
    quota: string;
    used: string;
    free_space: string;
    plan: string;
  }[];
};

export function toUserDetailWithStorageResponse(
  user: UserWithStorage
): UserDetailWithStorageResponse {
  return {
    uuid: user.uuid,
    full_name: user.full_name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    deleted_at: user.deleted_at || undefined,
    storage: user.user_storage
      ? [
          {
            quota: convertSize(Number(user.user_storage.quota)),
            used: convertSize(Number(user.user_storage.used)),
            free_space: convertSize(
              Number(user.user_storage.quota) - Number(user.user_storage.used)
            ),
            plan: user.user_storage.plan,
          },
        ]
      : undefined,
  };
}
