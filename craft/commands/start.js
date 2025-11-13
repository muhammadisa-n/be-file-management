const { spawnSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function Start() {
  const entryPoint = path.resolve("build/main.js");

  if (!fs.existsSync(entryPoint)) {
    console.error(
      chalk.red(
        `❌ Build file not found: ${entryPoint}\nPlease run 'node craft build' before starting the production server.`
      )
    );
    process.exit(1);
  }

  console.log(chalk.blue("🚀 Starting production server...."));
  const result = spawnSync("node", [entryPoint], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(chalk.red("❌ Failed to start production server."));
    process.exit(result.status ?? 1);
  }
}
module.exports = Start;
