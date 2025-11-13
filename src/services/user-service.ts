import {
  CreateUserRequest,
  ListUserRequest,
  UpdateUserRequest,
  toUserResponse,
  UserResponse,
} from "../dtos/user-dto";
import { ResponseError } from "../utils/response-error";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../utils/validation";
import * as argon2 from "argon2";
import { listResponse, tolistResponse } from "../dtos/list-dto";
import { UserRepository } from "../repositories/user-repository";
import { env } from "../config/env";
export class UserService {
  static async create(request: CreateUserRequest): Promise<UserResponse> {
    const data = Validation.validate(UserValidation.CREATE, request);
    const emailExits = await UserRepository.countByEmail(data.email);
    if (emailExits != 0) {
      throw new ResponseError(409, "Email Sudah Terdaftar");
    }
    data.password = await argon2.hash(data.password);

    const response = await UserRepository.create({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
    return toUserResponse(response);
  }
  static async getAll(request: ListUserRequest): Promise<listResponse> {
    const requestList = Validation.validate(UserValidation.LIST, request);
    const filters = [];
    if (requestList.name) {
      filters.push({
        fullName: {
          contains: requestList.name,
        },
      });
    }
    const data = await UserRepository.findMany(
      filters,
      requestList.skip,
      requestList.take
    );
    const totalData = await UserRepository.count(filters);
    const result = {
      data,
      total_data: totalData,
      paging: {
        current_page: requestList.page,
        total_page: Math.ceil(totalData / requestList.take),
      },
    };
    return tolistResponse(result);
  }

  static async getOne(id: string): Promise<UserResponse> {
    const data = await UserRepository.findById(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    return toUserResponse(data);
  }
  static async update(
    id: string,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const data = Validation.validate(UserValidation.UPDATE, request);
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    if (data.fullName) {
      user.fullName = data.fullName;
    }
    if (data.password) {
      user.password = await argon2.hash(data.password);
    }
    if (data.email && data.email !== user.email) {
      const emailExists = await UserRepository.countByEmail(data.email);
      if (emailExists != 0) {
        throw new ResponseError(409, "Email Sudah Ada");
      }
      user.email = data.email;
    }
    const result = await UserRepository.update(id, {
      fullName: user.fullName,
      password: user.password,
      email: user.email,
    });
    return toUserResponse(result);
  }

  static async delete(id: string) {
    const data = await UserRepository.findById(id);
    if (!data) {
      throw new ResponseError(404, "Data Tidak Ditemukan");
    }
    await UserRepository.delete(id);
  }
}
