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

  static async findById(id: number) {
    return prismaClient.user.findUnique({
      where: { id: id },
      include: {
        user_storage: true,
      },
    });
  }
  static async findByUUID(uuid: string) {
    return prismaClient.user.findUnique({
      where: { uuid: uuid },
      include: {
        user_storage: {
          select: {
            uuid: true,
            quota: true,
            used: true,
            plan: true,
          },
        },
      },
    });
  }

  static async update(uuid: string, data: any) {
    return prismaClient.user.update({
      where: { uuid },
      data,
    });
  }

  static async delete(uuid: string) {
    return prismaClient.user.delete({ where: { uuid } });
  }

  static async findUserByEmail(login: string) {
    return prismaClient.user.findFirst({
      where: {
        email: login,
      },
    });
  }

  static async updateUser(data: any, uuid: string) {
    return prismaClient.user.update({
      where: { uuid },
      data,
    });
  }

  static async findemailExistsNotUserLoggedIn(email: string, uuid: string) {
    return prismaClient.user.count({
      where: {
        email: email,
        NOT: {
          uuid: uuid,
        },
      },
    });
  }
}
