import { prismaClient } from "../config/database";

export class FileRepository {
  static async create(data: any) {
    return prismaClient.file.create({ data });
  }

  static async findByUUID(uuid: string) {
    return prismaClient.file.findFirst({
      where: {
        uuid,
        deleted_at: null,
      },
    });
  }

  static async findMany(filters: any, skip: number, take: number) {
    return prismaClient.file.findMany({
      where: {
        AND: filters,
        deleted_at: null,
      },
      skip,
      take,
      orderBy: { updated_at: "desc" },
    });
  }

  static async count(filters?: any) {
    return prismaClient.folder.count({
      where: {
        AND: filters,
        deleted_at: null,
      },
    });
  }

  static async findById(uuid: string) {
    return prismaClient.user.findUnique({
      where: { uuid },
    });
  }

  static async delete(uuid: string) {
    return prismaClient.user.delete({ where: { uuid } });
  }

  static async update(data: any, uuid: string) {
    return prismaClient.file.update({
      where: { uuid },
      data,
    });
  }

  static async softDelete(id: number) {
    return prismaClient.file.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
