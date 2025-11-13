const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function MakeTest(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a test file name."));
    process.exit(1);
  }

  const testDir = path.resolve(process.cwd(), "test");
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  const fileName = name.endsWith(".test.ts") ? name : `${name}.test.ts`;
  const filePath = path.join(testDir, fileName);

  if (fs.existsSync(filePath)) {
    console.log(chalk.red(`❌ Test file already exists: ${fileName}`));
    process.exit(1);
  }

  const template = `import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

// example
describe("POST /api/users", () => {
  it("should register new user", async () => {
    const response = await supertest(web).post("/api/auth/register").send({
      fullName: "test",
      email: "testing@gmail.com",
      password: "12345678",
    });
    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.fullName).toBe("test");
    expect(response.body.data.email).toBe("testing@gmail.com");
  });
});
`;

  fs.writeFileSync(filePath, template, "utf-8");
  console.log(chalk.green(`✅ Test file created at: ${filePath}`));
}

module.exports = MakeTest;
