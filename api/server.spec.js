const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig.js");

let token;

describe("Post /register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it.skip("returns 201", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Gabe",
        password: "Ball4theGame"
      })
      .then(res => {
        expect(res.status).toBe(201);
        token;
      });
  });
  it.skip("returns user object", () => {
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

describe("Post /login", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("returns 200", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Gabe",
        password: "Ball4theGame"
      })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it.skip("returns user object", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Gabe",
        password: "Ball4theGame"
      })
      .then(res => {
        expect(typeof res.body).toBe("object");
      });
  });
});

describe("Get /jokes", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("returns 200", () => {
    return request(server)
      .post("/api/login")
      .send({
        username: "Gabe",
        password: "Ball4theGame"
      })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it.skip("returns user object", () => {
    return request(server)
      .post("/api/jokes")
      .send({
        username: "Gabe",
        password: "Ball4theGame"
      })
      .then(res => {
        expect(typeof res.body).toBe("object");
      });
  });
});
