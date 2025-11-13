const { spawnSync } = require("child_process");
const chalk = require("chalk");

function DbGenerate() {
  console.log(chalk.blue("🚀 Running prisma generate..."));

  const result = spawnSync("npx", ["prisma", "generate"], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(chalk.red("❌ Generate failed."));
    // Jika ada error, print detailnya
    if (result.error) {
      console.error(chalk.red(`Error: ${result.error.message}`));
    }
    process.exit(result.status ?? 1);
  } else {
    console.log(chalk.green("✅ Prisma generate completed."));
  }
}
module.exports = DbGenerate;
