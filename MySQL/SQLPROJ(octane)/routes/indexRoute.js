const express = require("express")
const router = express.Router()

router.use('/',require('./authRoute.js'))

router.use('/',require("./attendanceRoutes.js"))

module.exports = router;