const express = require("express")
const router = express.Router()

router.use('/user',require('../routes/userRoute.js'))

module.exports = router;