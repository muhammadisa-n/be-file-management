#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command(
    "build",
    "Building project to production ",
    () => {},
    () => {
      const build = require("./craft/commands/build.js");
      build();
    }
  )
  .command(
    "db:generate",
    "Running prisma generate",
    () => {},
    () => {
      const dbgenerate = require("./craft/commands/db-generate.js");
      dbgenerate();
    }
  )
  .command(
    "db:migrate",
    "Running prisma migration",
    () => {},
    () => {
      const migrate = require("./craft/commands/db-migrate.js");
      migrate();
    }
  )
  .command(
    "db:fresh",
    "Running prisma migrate fresh",
    () => {},
    () => {
      const dbfresh = require("./craft/commands/db-fresh.js");
      dbfresh();
    }
  )
  .command(
    "dev",
    "Starting development server",
    () => {},
    () => {
      const dev = require("./craft/commands/dev.js");
      dev();
    }
  )
  .command(
    "key:generate",
    "Generate JWT SECRET KEY",
    () => {},
    () => {
      const dev = require("./craft/commands/key-generate.js");
      dev();
    }
  )
  .command(
    "make:apidocs <name>",
    "Generate a new api documentation",
    (yargs) => {
      yargs.positional("name", {
        describe: "apidocs name",
        type: "string",
      });
    },
    (argv) => {
      const makeapidocs = require("./craft/commands/make-apidocs.js");
      makeapidocs(argv.name);
    }
  )
  .command(
    "make:command <name>",
    "Generate a new craft command",
    (yargs) => {
      yargs.positional("name", {
        describe: "Command name",
        type: "string",
      });
    },
    (argv) => {
      const makecommand = require("./craft/commands/make-command.js");
      makecommand(argv.name);
    }
  )
  .command(
    "make:controller <name>",
    "Generate a new controller",
    (yargs) => {
      yargs
        .positional("name", {
          describe: "Controller name",
          type: "string",
        })
        .option("resource", {
          describe: "Generate resource style controller methods",
          type: "boolean",
          default: false,
        });
    },
    (argv) => {
      const makecontroller = require("./craft/commands/make-controller.js");
      makecontroller(argv.name, { resource: argv.resource });
    }
  )
  .command(
    "make:middleware <name>",
    "Generate a new middleware",
    (yargs) => {
      yargs.positional("name", {
        describe: "Middleware name",
        type: "string",
      });
    },
    (argv) => {
      const makemiddleware = require("./craft/commands/make-middleware.js");
      makemiddleware(argv.name);
    }
  )
  .command(
    "make:repository <name>",
    "Generate a new respository",
    (yargs) => {
      yargs.positional("name", {
        describe: "Repository name",
        type: "string",
      });
    },
    (argv) => {
      const makerepository = require("./craft/commands/make-repository.js");
      makerepository(argv.name);
    }
  )
  .command(
    "make:dto <name>",
    "Generate a new dto",
    (yargs) => {
      yargs.positional("name", {
        describe: "Dto name",
        type: "string",
      });
    },
    (argv) => {
      const makedto = require("./craft/commands/make-dto.js");
      makedto(argv.name);
    }
  )
  .command(
    "make:route <name>",
    "Generate a new route",
    (yargs) => {
      yargs.positional("name", {
        describe: "Route name",
        type: "string",
      });
    },
    (argv) => {
      const makeroute = require("./craft/commands/make-route.js");
      makeroute(argv.name);
    }
  )
  .command(
    "make:service <name>",
    "Generate a new service",
    (yargs) => {
      yargs.positional("name", {
        describe: "Service name",
        type: "string",
      });
    },
    (argv) => {
      const makeservice = require("./craft/commands/make-service.js");
      makeservice(argv.name);
    }
  )
  .command(
    "make:test <name>",
    "Generate a new unit test",
    (yargs) => {
      yargs.positional("name", {
        describe: "Test name",
        type: "string",
      });
    },
    (argv) => {
      const maketest = require("./craft/commands/make-test.js");
      maketest(argv.name);
    }
  )
  .command(
    "make:utils <name>",
    "Generate a new utils",
    (yargs) => {
      yargs.positional("name", {
        describe: "Utils name",
        type: "string",
      });
    },
    (argv) => {
      const makeutils = require("./craft/commands/make-utils.js");
      makeutils(argv.name);
    }
  )
  .command(
    "make:validation <name>",
    "Generate a new validation",
    (yargs) => {
      yargs.positional("name", {
        describe: "Validation name",
        type: "string",
      });
    },
    (argv) => {
      const makevalidation = require("./craft/commands/make-validation.js");
      makevalidation(argv.name);
    }
  )
  .command(
    "make:view <name>",
    "Generate a new view",
    (yargs) => {
      yargs.positional("name", {
        describe: "View name",
        type: "string",
      });
    },
    (argv) => {
      const makeview = require("./craft/commands/make-view.js");
      makeview(argv.name);
    }
  )
  .command(
    "start",
    "Starting production server",
    () => {},
    () => {
      const start = require("./craft/commands/start.js");
      start();
    }
  )
  .command(
    "test",
    "Run Jest unit tests",
    () => {},
    () => {
      const runtest = require("./craft/commands/test.js");
      runtest();
    }
  )
  .demandCommand()
  .strict()
  .help()
  .parse();
