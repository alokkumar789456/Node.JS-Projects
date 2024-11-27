const express = require("express");
const router = express.Router();

// auth Routes 
router.use("/", require("./authRoute.js"));

// Attendence route 
router.use("/", require("./attendanceRoutes.js"));

// user Route 
router.use("/", require("./userRoute.js"));

module.exports = router;
