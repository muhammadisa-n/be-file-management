import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  ListUserRequest,
  UpdateUserRequest,
} from "../dtos/user-dto";
import { UserService } from "../services/user-service";
import {
  successCreateResponse,
  successDeleteResponse,
  successResponse,
  successUpdateResponse,
} from "../utils/response";
import { UserRequest } from "../types/type-request";

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const take = Number(req.query.take) || 10;
      const request: ListUserRequest = {
        page: page,
        take: take,
        skip: (page - 1) * take,
        name: req.query.name as string,
      };
      const response = await UserService.getAll(request);
      res
        .status(200)
        .json(successResponse("Berhasil Get All Data", 200, response));
    } catch (e) {
      next(e);
    }
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await UserService.getOne(id);
      res
        .status(200)
        .json(successResponse("Berhasil Get Detail Data", 200, response));
    } catch (e) {
      next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      console.log(request);
      const response = await UserService.create(request);
      res.status(201).json(successCreateResponse(response));
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(id, request);
      res.status(200).json(successUpdateResponse(response));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await UserService.delete(id);
      res.status(200).json(successDeleteResponse());
    } catch (e) {
      next(e);
    }
  }
}
