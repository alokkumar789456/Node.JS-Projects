const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../config/DB");
const Employee = require("../models/userModel");
const Attendance = require("../models/attendance");

// Close database connection after all tests
afterAll(async () => {
  if (sequelize) {
    await sequelize.close();
  }
});

describe("POST /checkIn", () => {
  it("should return 404 if employee not found", async () => {
    const response = await request(app).post("/checkIn").send({
      empId: 999, // Non-existing employee
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Employee not found. Please register first."
    );
  });

  it("should return 201 for successful check-in", async () => {
    const response = await request(app).post("/checkIn").send({
      empId: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Check-in recorded successfully");
  });
});

describe("POST /checkOut", () => {
  it("should return 404 if employee not found", async () => {
    const response = await request(app).post("/checkOut").send({
      empId: 999,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Employee not found. Please register first."
    );
  });

  it("should return 400 if no check-in record exists for today's check-out", async () => {
    // Ensure there is no check-in record for the employee on the given date
    const response = await request(app).post("/checkOut").send({
      empId: 22,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "No check-in record found for today's check-out"
    );
  });

  afterAll(() => {
    try {
      Attendance.destroy({ where: { empId: [1, 22] } });
    } catch {
      console.log("Unable to delete CheckIn checkOut Timings");
    }
  });
});

describe("POST /leaveApproval", () => {
  it("Should get 401 If token is not present", async () => {
    const response = await request(app).post("/leaveApproval").send({
      empId: 7231,
      status: "present",
      date: "2024-11-25",
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Access denied. No token provided.");
  });

  it("should return 403 if he is not admin", async () => {
    const response1 = await request(app).post("/login").send({
      email: "emp21@gmail.com",
      password: "admin",
    });

    const cookies = response1.headers["set-cookie"][0];
    const adminToken = cookies.split(";")[0].split("=")[1];

    const response2 = await request(app)
      .post("/leaveApproval")
      .set("Cookie", [`authToken=${adminToken}`])
      .send({
        empId: 3,
        status: "present",
        date: "2024-11-25",
      });

    expect(response2.status).toBe(403);
    expect(response2.body.error).toBe(
      "You are not authorized to perform this action."
    );
  });

  it("should return 400/404 if status, and date format is not set correctly, if record not set properly", async () => {
    const response1 = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });
    const cookies = response1.headers["set-cookie"][0];
    const adminToken = cookies.split(";")[0].split("=")[1];

    const response2 = await request(app)
      .post("/leaveApproval")
      .set("Cookie", [`authToken=${adminToken}`])
      .send({
        empId: 3,
        status: "presentt",
        date: "2024-11-25",
      });

    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe(
      "Invalid status value. Use 'present' or 'absent' only."
    );

    const response3 = await request(app)
      .post("/leaveApproval")
      .set("Cookie", [`authToken=${adminToken}`])
      .send({
        empId: 3,
        status: "present",
        date: "25-2024-11",
      });

    expect(response3.status).toBe(400);
    expect(response3.body.error).toBe("Invalid date format. Use YYYY-MM-DD.");

    const response4 = await request(app)
      .post("/leaveApproval")
      .set("Cookie", [`authToken=${adminToken}`])
      .send({
        empId: 1,
        status: "present",
        date: "2024-11-25",
      });

    expect(response4.status).toBe(404);
    expect(response4.body.error).toBe(
      "Attendance record not found or already marked as present for this date."
    );
  });

  it("Expect 200 For Successfully updating Attendance", async () => {
    const response1 = await request(app).post("/checkIn").send({
      empId: 1, // Existing employee
    });

    expect(response1.status).toBe(201);
    expect(response1.body.message).toBe("Check-in recorded successfully");

    const response2 = await request(app).post("/checkOut").send({
      empId: 1, // Existing employee
    });

    expect(response2.status).toBe(200);
    expect(response2.body.message).toBe("Check-out recorded successfully");

    const response3 = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "admin",
    });
    const cookies = response3.headers["set-cookie"][0];
    const adminToken = cookies.split(";")[0].split("=")[1];

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    // console.log(formattedDate);

    const response4 = await request(app)
      .post("/leaveApproval")
      .set("Cookie", [`authToken=${adminToken}`])
      .send({
        empId: 1,
        status: "present",
        date: formattedDate,
      });

    expect(response4.status).toBe(200);
    expect(response4.body.message).toBe("Attendance status updated successfully.");
  });
  afterAll(() => {
    try {
      Attendance.destroy({ where: { empId: 1 } });
    } catch {
      console.log("Unable to delete CheckIn checkOut Timings");
    }
  });
});
