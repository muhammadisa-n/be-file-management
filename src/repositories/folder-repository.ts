import { prismaClient } from "../config/database";

export class FolderRepository {
  static async create(data: any) {
    return prismaClient.folder.create({ data });
  }

  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.folder.findMany({
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
    return prismaClient.folder.count({
      where: {
        AND: filters,
        deleted_at: null,
      },
    });
  }

  static async findById(id: number) {
    return prismaClient.folder.findUnique({
      where: { id },
    });
  }

  static async findByUUID(uuid: string) {
    return prismaClient.folder.findUnique({
      where: { uuid },
    });
  }

  static async delete(uuid: string) {
    return prismaClient.user.delete({ where: { uuid } });
  }
}
