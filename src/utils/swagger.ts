import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { SwaggerTheme } from "swagger-themes";
import { env } from "../config/env";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${env.APP_NAME} Api Documentation`,
      version: "1.0.0",
    },
    servers: [
      {
        url: `${env.BASE_URL}`,
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            fullName: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
            deleted_at: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["fullName", "email", "password"],
        },
      },
      responses: {
        UnauthorizedATError: {
          description: "Unauthorized – token tidak valid atau tidak ada",
          content: {
            "application/json": {
              example: {
                status: false,
                status_code: 401,
                message: "Unauthorized: Access Token Tidak Valid.",
              },
            },
          },
        },
        UnauthorizedNotLoginError: {
          description: "Unauthorized - Belum Login.",
          content: {
            "application/json": {
              example: {
                status: false,
                status_code: 401,
                message: "Unauthorized: Anda Belum Login.",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation Error",
          content: {
            "application/json": {
              example: {
                status: false,
                status_code: 400,
                message: "Validation Error",
                errors: {
                  field: "string",
                  message: "string",
                },
              },
            },
          },
        },
        NotFoundError: {
          description: "Data tidak ditemukan",
          content: {
            "application/json": {
              example: {
                status: false,
                status_code: 404,
                message: "Data Tidak Ditemukan",
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // apis: ["./src/route/**/*.ts"],
  apis: ["./src/apidocs/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const theme = new SwaggerTheme();
const themeCss = theme.getBuffer("dark-monokai" as any);
export function setupSwagger(app: Express) {
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: themeCss,
      customSiteTitle: `${env.APP_NAME}  Api Documentation`,
    })
  );
}
