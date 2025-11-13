import { NextFunction, Request, Response } from "express";
import {
  loginRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from "../dtos/user-dto";
import { successResponse, successUpdateResponse } from "../utils/response";
import { AuthService } from "../services/auth-service";
import { UserRequest } from "../types/type-request";
import { env } from "../config/env";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await AuthService.register(request);
      res.status(201).json(successResponse("Register Berhasil", 201, response));
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: loginRequest = req.body as loginRequest;
      const response = await AuthService.login(request);
      res.status(200).json(
        successResponse("Login Berhasil", 200, {
          user: response.user,
          token: response.token,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async me(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.me(req.user!.uuid);
      res
        .status(200)
        .json(successResponse("Get Detail User Berhasil", 200, response));
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    await AuthService.logout(req);

    res.status(200).json(successResponse("Logout berhasil", 200));
  }
}
