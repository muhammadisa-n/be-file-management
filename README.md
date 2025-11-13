# CraftJS

A starter kit backend framework powered by Express, TypeScript, EJS Engine, and Prisma — designed for rapid development, simplicity, and scalability.

---

## Features

- **Express.js** based API architecture
- **TypeScript** support out of the box
- **Prisma ORM** with scalable database structure
- **CLI tool** (`craft`) for project automation
- Built-in **Logger**, **Validation**, **Error handler**, and **Request lifecycle**
- Predefined project structure for fast onboarding

---

💡 Note: EJS View Engine is included but disabled by default. To enable it:
Open src/application/web.ts and uncomment the following lines:

```bash
import expressLayouts from "express-ejs-layouts";
import path from "path";

web.set("view engine", "ejs");
web.set("views", path.join(\_\_dirname, "..", "views"));
web.use(expressLayouts);
web.set("layout", "layouts/main");
```

Then, go to src/routes/main-route.ts and uncomment this:

```bash
mainRouter.get("/", (req, res) => {
res.render("index", { title: "Home Page" });
});
```

## Getting Started

### Scaffold a New Project

```bash
npx create-craftjs  my-app
```

OR

```bash
npm init craftjs my-app
```

### Go to project folder

```bash
cd my-app
```

### Run Craft Setup

```bash
npm install
node craft key:generate
node craft generate
node craft db:migrate
node craft dev
```

### Available Craft Commands

```bash
node craft help
```

---

## Project Structure

```
my-app/
├── craft/
├── src/
│   ├── apidocs/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── dtos/
│   ├── routes/
│   └── services/
│   └── types/
│   └── utils/
│   └── validations/
│   └── main.ts
├── test/
├── logs/
├── docker-compose.yml
├── Dockerfile
├── .env
├── .env.example
├── prisma/
├── .gitignore
├── babel.config.json
├── craft.js
├── nodemon.json
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `craft start`           | Start production server        |
| `craft dev`             | Run in development mode        |
| `craft build`           | Build for production           |
| `craft test`            | Run Jest tests                 |
| `craft db:generate`     | Generate Prisma client         |
| `craft db:migrate`      | Run Prisma migrations          |
| `craft db:reset`        | Run Prisma migrations refresh  |
| `craft key:generate`    | Generate secret keys           |
| `craft make:controller` | Make Controller File           |
| `craft make:command`    | Make Command File              |
| `craft make:middleware` | Make Middleware File           |
| `craft make:repository` | Make repository File           |
| `craft make:dto`        | Make Data Transfer Object File |
| `craft make:route`      | Make Route File                |
| `craft make:service`    | Make Service File              |
| `craft make:test`       | Make Test case                 |
| `craft make:utils`      | Make Utils                     |
| `craft make:validation` | Make Validation                |
| `craft make:view`       | Make View                      |

---

Made by [@muhammadisa-n](https://github.com/muhammadisa-n)
