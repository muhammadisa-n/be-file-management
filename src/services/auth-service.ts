import {
  toUserDetailResponse,
  toUserResponse,
  UserDetailResponse,
  UserResponse,
  loginRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from "../dtos/user-dto";
import { ResponseError } from "../utils/response-error";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../utils/validation";
import * as argon2 from "argon2";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UserRepository } from "../repositories/user-repository";
import { UserRequest } from "../types/type-request";
import { prismaClient } from "../config/database";
import { env } from "../config/env";
import { RevokedTokenRepository } from "../repositories/token-repository";

export class AuthService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const data = Validation.validate(UserValidation.REGISTER, request);
    const emailExits = await UserRepository.countByEmail(data.email);

    if (emailExits != 0) {
      throw new ResponseError(409, "Akun Sudah Terdaftar!");
    }

    data.password = await argon2.hash(data.password);

    const response = await UserRepository.create({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    });
    return toUserResponse(response);
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

  static async me(user: User): Promise<UserDetailResponse> {
    return toUserDetailResponse(user);
  }

  static async updateProfile(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const data = Validation.validate(UserValidation.UPDATE, request);
    if (data.full_name) {
      user.full_name = data.full_name;
    }
    if (data.password) {
      user.password = await argon2.hash(data.password);
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await UserRepository.findemailExistsNotUserLoggedIn(
        data.email,
        user.uuid
      );
      if (emailExists != 0) {
        throw new ResponseError(409, "Email Sudah Ada");
      }
      user.email = data.email;
    }
    const result = await UserRepository.updateUser(
      {
        full_name: user.full_name,
        password: user.password,
        email: user.email,
      },
      user.uuid
    );
    return toUserResponse(result);
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
