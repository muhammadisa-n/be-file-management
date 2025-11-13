const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function toPascalCase(str) {
  return str.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
}

function makeController(name, options = {}) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a controller name."));
    return;
  }

  const parts = name.split("/");
  const rawName = parts.pop();
  const className = `${toPascalCase(rawName)}Controller`;
  const fileName = `${rawName.toLowerCase()}-controller.ts`;
  const targetDir = path.resolve("src", "controllers", ...parts);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Controller already exists."));
    return;
  }

  const resourceMethods = `
 static async getAll(req: Request, res: Response, next: NextFunction) {
     try {
      res.status(200).json({ message: "Listing all resources" });
    } catch (error) {
      next(error);
    }
  }

 static async getOne(req: Request, res: Response,  next: NextFunction) {
  try {
      res.status(200).json({ message: "Showing single resource" });
    } catch (error) {
      next(error);
    }
  }

 static async create(req: Request, res: Response, next: NextFunction) {
  try {
      res.status(201).json({ message: "Resource created" });
    } catch (error) {
      next(error);
    }
  }

 static async update(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: "Resource updated" });
    } catch (error) {
      next(error);
    }
  }

 static async delete(req: Request, res: Response, next: NextFunction) {
      try {
      res.status(201).json({ message: "Resource deleted" });
    } catch (error) {
      next(error);
    }
  }
`;

  const defaultMethod = `
 static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  }
`;

  const methods = options.resource ? resourceMethods : defaultMethod;

  const content = `import { Request, Response,NextFunction } from "express";

export class ${className} {${methods}
}
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Controller created at ${filePath}`));
}

module.exports = makeController;
