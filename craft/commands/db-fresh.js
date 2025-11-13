const { spawnSync } = require("child_process");
const chalk = require("chalk");

function DbReset() {
  console.log(chalk.blue("🚀 Running prisma migrate reset..."));

  const result = spawnSync("npx", ["prisma", "migrate", "reset"], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(chalk.red("❌ Migrate reset failed."));
    if (result.error) {
      console.error(chalk.red(`Error: ${result.error.message}`));
    }
    process.exit(result.status ?? 1);
  } else {
    console.log(chalk.green("✅ Migrate reset completed."));
  }
}
module.exports = DbReset;
