const express = require("express");
const router = express.Router();
const { changePassword, userDetails } = require("../controllers/userController.js");

router.post("/changePassword", changePassword);

router.get("/userDetails", userDetails);

module.exports = router;
