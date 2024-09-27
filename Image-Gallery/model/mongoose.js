const mongoose = require('mongoose')

const mongoConnection = mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log(`mongoDB connected to the DataBase`);
})
.catch((err)=>{
    console.error(err.message);
})

module.exports = mongoConnection