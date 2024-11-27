const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../config/DB");
const Employee = require("../models/userModel");

// Close database connection after all tests
afterAll(async () => {
  if (sequelize) {
    await sequelize.close();
  }
});

describe("POST /login", () => {
  it("should return 404 for entering wrong password", async () => {
    const response = await request(app).post("/login").send({
      email: "Alooo@gmail.com",
      password: "meinHuDon",
    });

    expect(response.status).toBe(404);
    expect(response.text).toBe("You don't have an account with this email!");
  });

  it("should return 200 for successful login", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Login successful! Welcome, Employee ID: 1");
  });

  it("should return 401 for incorrect password", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "wrongpassword", // Incorrect password
    });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Incorrect password. Please try again.");
  });
});

describe("POST /register", () => {
  it("should return 401 if token is not provided", async () => {
    const response = await request(app).post("/register").send({
      email: "admin@gmail.com",
      role: "admin",
      dept: "IT",
      branch: "Headquarters",
      admin: false,
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Access denied. No token provided.");
  });

  it("should return 403 for non-admin trying to register", async () => {
    const response1 = await request(app).post("/login").send({
      email: "emp06@gmail.com", // Non-admin user
      password: "admin",
    });
    const cookies = response1.headers["set-cookie"][0];
    const nonAdminToken = cookies.split(";")[0].split("=")[1];

    const response2 = await request(app)
      .post("/register")
      .set("Cookie", [`authToken=${nonAdminToken}`])
      .send({
        email: "admin@gmail.com",
        role: "admin",
        dept: "IT",
        branch: "Headquarters",
        admin: false,
      });

    expect(response2.status).toBe(403);
    expect(response2.body.error).toBe(
      "Access denied. Admin privileges required."
    );
  });

  it("should successfully register a new user", async () => {
    const response1 = await request(app).post("/login").send({
      email: "admin@gmail.com", // Admin login
      password: "admin",
    });

    const cookies = response1.headers["set-cookie"][0];
    const adminToken = cookies.split(";")[0].split("=")[1];

    const response2 = await request(app)
      .post("/register")
      .set("Cookie", [`authToken=${adminToken}`])
      .send({
        email: "emp999@gmail.com",
        role: "Employee",
        dept: "IT",
        branch: "Headquarters",
        admin: false,
      });

    expect(response2.status).toBe(201);
    expect(response2.body.email).toBe("emp999@gmail.com");
    expect(response2.body.generatedPassword).toBeDefined();
  });

  afterAll(async () => {
    try {
      await Employee.destroy({
        where: { email: "emp999@gmail.com" },
      });
    } catch {
      console.log("Unable to delete User");
    }
  });
  
});
