const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function keyGenerate() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    console.error(chalk.red("❌ .env file not found!"));
    process.exit(1);
  }

  let envContent = fs.readFileSync(envPath, "utf-8");

  const generateKey = (number) => crypto.randomBytes(number).toString("hex");

  if (envContent.includes("JWT_SECRET=")) {
    envContent = envContent.replace(
      /JWT_SECRET=.*/g,
      `JWT_SECRET=${generateKey(16)}`
    );
  } else {
    envContent += `\nJWT_SECRET_ACCESS_TOKEN=${generateKey(16)}`;
  }

  if (envContent.includes("APP_SECRET=")) {
    envContent = envContent.replace(
      /APP_SECRET=.*/g,
      `APP_SECRET=${generateKey(32)}`
    );
  } else {
    envContent += `\APP_SECRET=${generateKey(32)}`;
  }

  fs.writeFileSync(envPath, envContent);

  console.log(
    chalk.green("✅ App Secret and JWT Secret generated successfully.")
  );
}
module.exports = keyGenerate;
