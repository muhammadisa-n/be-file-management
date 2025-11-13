const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const toPascalCase = (str) =>
  str.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());

function makeRoute(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a route name."));
    return;
  }

  const routeName = name.toLowerCase();
  const className = `${toPascalCase(name)}Controller`;
  const routeConst = `${routeName}Router`;
  const fileName = `${routeName}-route.ts`;
  const targetDir = path.resolve("src", "routes");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Route already exists."));
    return;
  }

  const content = `import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { authMiddleware } from "../middleware/auth-middleware";

import { ${className} } from "../controllers/${routeName}-controller";

export const ${routeConst} = express.Router();

// Example routes:
${routeConst}.get("/api/${routeName}s", ${className}.getAll);
${routeConst}.get("/api/${routeName}s/:id", ${className}.getOne);
${routeConst}.post("/api/${routeName}s", ${className}.create);
${routeConst}.get("/api/${routeName}s/:id", ${className}.update);
${routeConst}.get("/api/${routeName}s/:id", ${className}.delete);
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Route created at ${filePath}`));

  const mainRouterPath = path.resolve("src", "routes", "main-route.ts");

  if (fs.existsSync(mainRouterPath)) {
    let mainRouterContent = fs.readFileSync(mainRouterPath, "utf-8");

    const importStatement = `import { ${routeConst} } from "./${routeName}-route";`;
    const useStatement = `mainRouter.use(${routeConst});`;

    if (!mainRouterContent.includes(importStatement)) {
      const lines = mainRouterContent.split("\n");
      const importIndex = lines.findIndex((line) => line.startsWith("import"));
      const lastImportIndex = [...lines]
        .reverse()
        .findIndex((line) => line.startsWith("import"));
      const insertIndex =
        lastImportIndex >= 0 ? lines.length - lastImportIndex : 0;
      lines.splice(insertIndex, 0, importStatement);
      mainRouterContent = lines.join("\n");
    }

    if (!mainRouterContent.includes(useStatement)) {
      const routerEndIndex = mainRouterContent.lastIndexOf("mainRouter.use(");
      const insertIndex =
        routerEndIndex >= 0
          ? mainRouterContent.indexOf("\n", routerEndIndex) + 1
          : mainRouterContent.length;

      mainRouterContent =
        mainRouterContent.slice(0, insertIndex) +
        useStatement +
        "\n" +
        mainRouterContent.slice(insertIndex);
    }

    fs.writeFileSync(mainRouterPath, mainRouterContent);
    console.log(chalk.green("✅ Route registered in main-router."));
  } else {
    console.log(
      chalk.yellow("⚠️ main-route.ts not found. Please register manually.")
    );
  }
}

module.exports = makeRoute;
