//! new method 
// import mongoose from 'mongoose';

// const connectionURL = 'mongodb://localhost:27017/task-manager';

// mongoose.connect(connectionURL)
//     .then(() => console.log('Connected correctly!'))
//     .catch(err => console.log('Unable to connect to database!', err));


//! Create Operations
//! Insert a Single Document:

// db.collection.insertOne({ key: "value" })

//! Insert Multiple Documents:

// db.collection.insertMany([{ key1: "value1" }, { key2: "value2" }])

//! Read Operations
//! Find a Single Document:

// db.collection.findOne({ key: "value" })

//! Find Multiple Documents:

// db.collection.find({ key: "value" })

//! Find All Documents:

// db.collection.find()

//! Update Operations
//! Update a Single Document:

// db.collection.updateOne(
//   { key: "value" }, 
//   { $set: { key: "new_value" } }
// )

//! Update Multiple Documents:

// db.collection.updateMany(
//   { key: "value" }, 
//   { $set: { key: "new_value" } }
// )

//! Replace a Single Document:

// db.collection.replaceOne(
//   { key: "value" }, 
//   { key: "new_value" }
// )

//! Delete Operations
//! Delete a Single Document:

// db.collection.deleteOne({ key: "value" })

//! Delete Multiple Documents:

// db.collection.deleteMany({ key: "value" })

//! Search and Query Operations
//! Find Documents with Specific Criteria:

// db.collection.find({ key: "value" })

//! Find Documents with Multiple Criteria:

// db.collection.find({ key1: "value1", key2: "value2" })

//! Find Documents with a Range Query:

// db.collection.find({ key: { $gt: value1, $lt: value2 } })

//! Find Documents with a Specific Field:

// db.collection.find({}, { key: 1, _id: 0 }) 

// CRUD create read update delete

import { MongoClient } from "mongodb"

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }

        const db = client.db(databaseName)
        console.log(db);
        // db.collection('users').deleteMany({
        //     age: 27
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })

        // db.collection('tasks').deleteOne({
        //     description: "Clean the house"
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })
    }
)
    .then((err) => {
        throw err
    })
    .catch((client) => {
        const db = client.db(databaseName)
        console.log('connected successfully');
    })