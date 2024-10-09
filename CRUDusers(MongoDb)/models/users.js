const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/crud')
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

const userModel = mongoose.Schema({
    name:String,
    email:String,
    image:String
})

const users = mongoose.model('users',userModel)
module.exports = users

