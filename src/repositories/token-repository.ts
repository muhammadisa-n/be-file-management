import { prismaClient } from "../config/database";

export class RevokedTokenRepository {
  static async revokedToken(data: any) {
    return prismaClient.revokedToken.create({ data });
  }

  static async findByToken(token: string) {
    return prismaClient.revokedToken.findUnique({
      where: { token },
    });
  }
}
