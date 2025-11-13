const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function makeView(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a view name."));
    return;
  }

  const fileName = `${name.toLowerCase()}.ejs`;
  const targetDir = path.resolve("src", "views");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ View already exists."));
    return;
  }

  const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= title %></title>
  </head>
  <body
  <p>${name}</p>
  </body>
</html>
}
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ View created at ${filePath}`));
}

module.exports = makeView;
