const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig.js");

describe("Post /register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("returns 201", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Gabe",
        password: "Ball4theGame"
      })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
  it("returns user object", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Gabe",
        password: "Ball4theGame"
      })
      .then(res => {
        expect(typeof res.body).toBe("object");
      });
  });
});
