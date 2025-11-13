import { User } from "@prisma/client";
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
