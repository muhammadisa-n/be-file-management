const { spawnSync } = require("child_process");
const chalk = require("chalk");

function Dev() {
  console.log(chalk.blue("🚀 Starting development server with nodemon..."));
  const result = spawnSync("nodemon", ["./src/main.ts"], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(chalk.red("❌ Failed to start development server."));
    process.exit(result.status ?? 1);
  }
}
module.exports = Dev;
