import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "tes@gmail.com" },
    update: {},
    create: {
      full_name: "Tes",
      email: "tes@gmail.com",
      password: await argon2.hash("12345678"),
    },
  });
  await prisma.userStorage.upsert({
    where: { user_id: user.id },
    update: {},
    create: {
      user_id: user.id,
    },
  });
  console.log("Users seeded with user storage");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
