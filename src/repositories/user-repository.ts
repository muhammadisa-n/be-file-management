import { prismaClient } from "../config/database";

export class UserRepository {
  static async countByEmail(email: string): Promise<number> {
    return prismaClient.user.count({ where: { email } });
  }

  static async create(data: any) {
    return prismaClient.user.create({ data });
  }

  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.user.findMany({
      where: {
        AND: filters,
        deleted_at: null,
      },
      skip,
      take,
      orderBy: { updated_at: "desc" },
    });
  }

  static async count(filters: any) {
    return prismaClient.user.count({
      where: {
        AND: filters,
        deleted_at: null,
      },
    });
  }

  static async findById(id: string) {
    return prismaClient.user.findUnique({
      where: { id },
    });
  }

  static async update(id: string, data: any) {
    return prismaClient.user.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prismaClient.user.delete({ where: { id } });
  }

  static async findUserByEmail(login: string) {
    return prismaClient.user.findFirst({
      where: {
        email: login,
      },
    });
  }

  static async updateUser(data: any, id: string) {
    return prismaClient.user.update({
      where: { id },
      data,
    });
  }

  static async findemailExistsNotUserLoggedIn(email: string, idUser: string) {
    return prismaClient.user.count({
      where: {
        email: email,
        NOT: {
          id: idUser,
        },
      },
    });
  }
}
