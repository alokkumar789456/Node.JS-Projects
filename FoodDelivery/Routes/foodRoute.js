const express = require('express')
const route = express.Router()
const {createFood,readFood,updateFood,deleteFood} = require('../controllers/foodControllers.js')
const auth = require('../middlewares/auth.js')

route.get('/api',auth,createFood)
route.post('/api',auth,readFood)
route.patch('/api',auth,updateFood)
route.delete('/api',auth,deleteFood)

module.exports = route