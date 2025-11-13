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
  static async findByUUIDAndNotDeleted(uuid: string) {
    return prismaClient.file.findFirst({
      where: {
        uuid,
        NOT: { deleted_at: null },
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

  static async delete(id: number) {
    return prismaClient.file.delete({ where: { id } });
  }

  static async update(data: any, uuid: string) {
    return prismaClient.file.update({
      where: { uuid },
      data,
    });
  }

  static async softDelete(uuid: string) {
    return prismaClient.file.update({
      where: { uuid },
      data: { deleted_at: new Date() },
    });
  }

  static async findByUUIDWithOwnerAndFolder(uuid: string) {
    return prismaClient.file.findUnique({
      where: { uuid },
      include: {
        owner: true,
        folder: {
          include: {
            owner: true,
            parent: {
              include: {
                owner: true,
                parent: {
                  include: {
                    owner: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
