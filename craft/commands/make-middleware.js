const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const toCamelCase = (str) =>
  str
    .toLowerCase()
    .split("-")
    .map((word, i) => (i === 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join("");

function makeMiddleware(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a middleware name."));
    return;
  }

  const className = `${toCamelCase(name)}Middleware`;
  const fileName = `${name.toLowerCase()}-middleware.ts`;
  const targetDir = path.resolve("src", "middleware");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Middleware already exists."));
    return;
  }

  const content = `import { NextFunction, Request, Response } from "express";

export const ${className} = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Middleware created at ${filePath}`));
}
module.exports = makeMiddleware;
