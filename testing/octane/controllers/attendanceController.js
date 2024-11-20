const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const Attendance = require("../models/attendance.js");
const Employee = require("../models/userModel.js");
require("dotenv").config();

// jwt variable
const JWT_SECRET = process.env.JWT_SECRET;

// Check-in route
exports.checkIn = async (req, res) => {
  const { empId } = req.body;

  try {
    const employee = await Employee.findOne({ where: { empId } });
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found. Please register first." });
    }

    const checkInTime = new Date();
    // checkInTime.setHours(8, 0, 0, 0); //DBug Line
    const date = checkInTime.toISOString().split("T")[0];

    const attendance = await Attendance.create({
      empId,
      checkIn: checkInTime,
      date,
    });

    res
      .status(201)
      .json({ message: "Check-in recorded successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check-out route
exports.checkOut = async (req, res) => {
  const { empId } = req.body;

  try {
    const employee = await Employee.findOne({ where: { empId } });
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found. Please register first." });
    }

    const checkOutTime = new Date();
    // checkOutTime.setHours(16, 0, 0, 0);  // DBug Line
    const date = checkOutTime.toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      where: {
        empId,
        checkOut: null,
        date,
      },
      order: [["checkIn", "DESC"]],
    });

    if (!attendance) {
      return res
        .status(400)
        .json({ message: "No check-in record found for today's check-out" });
    }

    attendance.checkOut = checkOutTime;
    await attendance.save();

    const todayRecords = await Attendance.findAll({
      where: {
        empId,
        date,
        checkOut: { [Op.ne]: null },
      },
    });

    let totalDurationMs = 0;

    todayRecords.forEach((record) => {
      const checkInTime = new Date(record.checkIn);
      const checkOutTime = new Date(record.checkOut);
      totalDurationMs += checkOutTime - checkInTime;
    });

    const hours = Math.floor(totalDurationMs / (1000 * 60 * 60));
    const minutes = Math.floor(
      (totalDurationMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const totalDuration = `${hours}h ${minutes}m`;

    const status = hours >= 8 ? "Present" : "Absent";

    await Attendance.update(
      { status, timeDuration: totalDuration },
      {
        where: {
          empId,
          date,
        },
      }
    );

    res.status(200).json({
      message: "Check-out recorded successfully",
      totalDuration,
      status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.leaveApproval = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify token and get decoded information
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    // Check if the user is an admin
    const employee = await Employee.findOne({ where: { email } });
    if (!employee || !employee.admin) {
      return res
        .status(403)
        .json({ error: "You are not authorized to perform this action." });
    }

    const { empId, status, date } = req.body;

    // Validate status to be either "present" or "absent" 
    if (!["present", "absent"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value. Use 'present' or 'absent' only." });
    }

    // Validate date format (assuming YYYY-MM-DD format)
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    const updatedAttendance = await Attendance.update(
      { status },
      { where: { empId, date, status: { [Op.ne]: "present" } } }
    );

    if (updatedAttendance[0] === 0) {
      return res
        .status(404)
        .json({ error: "Attendance record not found or already marked as present for this date." });
    }

    res
      .status(200)
      .json({ message: "Attendance status updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
