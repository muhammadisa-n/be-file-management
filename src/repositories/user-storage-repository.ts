import { prismaClient } from "../config/database";

export class UserStorageRepository {
  static async create(data: any) {
    return prismaClient.userStorage.create({ data });
  }

  static async update(user_id: number, data: any) {
    return prismaClient.userStorage.update({
      where: { user_id: user_id },
      data,
    });
  }
  static async findByUserId(user_id: number) {
    return prismaClient.userStorage.findUnique({
      where: { user_id },
    });
  }
}
