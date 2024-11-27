const express = require("express");
const router = express.Router();

router.use('/',require("./userRoutes.js"));

module.exports = router;