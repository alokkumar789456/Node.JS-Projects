const express = require('express')
const route = express.Router()
const {createFood,readFood,updateFood,deleteFood,createMultipleFoods} = require('../controllers/foodControllers.js')
const auth = require('../middlewares/auth.js')

route.post('/api',auth,createFood)
route.post('/api/many', createMultipleFoods);
route.get('/api',auth,readFood)
route.patch('/api/:id',auth,updateFood)
route.delete('/api/:id',auth,deleteFood)

module.exports = route;