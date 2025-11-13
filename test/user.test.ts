import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
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
