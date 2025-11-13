import {
  toUserDetailResponse,
  toUserResponse,
  UserDetailResponse,
  UserResponse,
  loginRequest,
  CreateUserRequest,
  UserDetailWithStorageResponse,
  toUserDetailWithStorageResponse,
} from "../dtos/user-dto";
import { ResponseError } from "../utils/response-error";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../utils/validation";
import * as argon2 from "argon2";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user-repository";
import { UserRequest } from "../types/type-request";
import { env } from "../config/env";
import { RevokedTokenRepository } from "../repositories/token-repository";
import { UserStorageRepository } from "../repositories/user-storage-repository";

export class AuthService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const data = Validation.validate(UserValidation.REGISTER, request);
    const emailExits = await UserRepository.countByEmail(data.email);

    if (emailExits != 0) {
      throw new ResponseError(409, "Akun Sudah Terdaftar!");
    }

    data.password = await argon2.hash(data.password);

    const user = await UserRepository.create({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    });
    await UserStorageRepository.create({ user_id: user.id });
    return toUserResponse(user);
  }

  static async login(request: loginRequest) {
    const data = Validation.validate(UserValidation.LOGIN, request);
    const userExits = await UserRepository.findUserByEmail(data.email);

    if (!userExits) {
      throw new ResponseError(401, "Gagal Login! Detail login salah");
    }

    const isPasswordValid = await argon2.verify(
      userExits.password,
      data.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Gagal Login! Detail login salah");
    }

    const token = jwt.sign(
      {
        user_uuid: userExits.uuid,
        user_full_name: userExits.full_name,
        user_email: userExits.email,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    const user = toUserResponse(userExits);
    return { user, token };
  }

  static async me(userUuid: string): Promise<UserDetailWithStorageResponse> {
    const user = await UserRepository.findByUUID(userUuid);
    if (!user) throw new ResponseError(404, "User tidak ditemukan");

    return toUserDetailWithStorageResponse(user);
  }

  static async logout(req: UserRequest) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new ResponseError(401, "Token tidak ditemukan");
    const decoded = jwt.decode(token) as { exp: number };
    const expiredAt = new Date(decoded.exp * 1000);
    await RevokedTokenRepository.revokedToken({
      token: token,
      expired_at: expiredAt,
    });
  }
}
