const request = require("supertest");
const { sequelize } = require("../config/DB");
const app = require("../app.js");

describe("POST /changePassword", () => {
         
  it("should return 401 if token is not provided", async () => {
    const response = await request(app).post("/changePassword").send({
      newPassword: "admin",
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Access denied. No token provided.");
  });

  ("Should return 200 for changing Password!",async ()=>{
    const response1 = await request(app).post("/login").send({
        email: "admin@gmail.com", 
        password: "admin",
      });
  
      const cookies = response1.headers["set-cookie"][0];
      const adminToken = cookies.split(";")[0].split("=")[1];
  
      const response2 = await request(app).post("/changePassword").send({
        newPassword: "admin",
      });
  
      expect(response2.status).toBe(200);
      expect(response2.body.message).toBe("Password updated successfully");
  })
});
