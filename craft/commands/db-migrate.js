const { spawnSync } = require("child_process");
const chalk = require("chalk");

function DbMigrate() {
  console.log(chalk.blue("🚀 Running prisma migrate dev..."));

  const result = spawnSync("npx", ["prisma", "migrate", "dev"], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(chalk.red("❌ Migration failed."));
    if (result.error) {
      console.error(chalk.red(`Error: ${result.error.message}`));
    }
    process.exit(result.status ?? 1);
  } else {
    console.log(chalk.green("✅ Migration completed."));
  }
}
module.exports = DbMigrate;
