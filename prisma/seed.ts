import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "tes@gmail.com" },
    update: {},
    create: {
      full_name: "Tes",
      email: "tes@gmail.com",
      password: await argon2.hash("12345678"),
    },
  });

  console.log("Users seeded");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
