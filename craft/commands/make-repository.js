const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const toPascalCase = (str) =>
  str.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());

function makeRepository(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a repository name."));
    return;
  }

  const className = `${toPascalCase(name)}Repository`;
  const fileName = `${name.toLowerCase()}-repository.ts`;
  const targetDir = path.resolve("src", "repositories");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Repository already exists."));
    return;
  }

  const content = `import { prismaClient } from "../config/database";

export class ${className} {
}
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Repository created at ${filePath}`));
}
module.exports = makeRepository;
