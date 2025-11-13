const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const toPascalCase = (str) =>
  str.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());

function makeDto(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a dto name."));
    return;
  }

  const typeName = `${toPascalCase(name)}Request`;
  const fileName = `${name.toLowerCase()}-dto.ts`;
  const targetDir = path.resolve("src", "dtos");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Dto already exists."));
    return;
  }

  const content = `export type ${typeName} = {
  field1: string;
  field2?: string;   // optional

};
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Dto created at ${filePath}`));
}

module.exports = makeDto;
