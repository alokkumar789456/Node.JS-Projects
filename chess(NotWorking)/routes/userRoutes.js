const express  = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {listUsers,updateUser,deleteUser} = require("../controllers/userController.js")

// Route to list all users
router.get('/get/users',authMiddleware,listUsers)

// Route to update user 
router.put('/update/user',authMiddleware,updateUser)

// Route to delete user 
router.delete('/delete/user',authMiddleware,deleteUser)

module.exports = router;