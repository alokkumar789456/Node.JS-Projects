// const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/Hmmmmmm")
//     .then(()=>{console.log("mongo DB Connected")})
//     .catch(()=>{console.log("Something Went Wrong")})

//! COMPLETE MONGODB 
//! MOST USED COMMANDS 
// 1. show dbs () shows list of dataBases
// 2. show collections() shows list of collections 
// 3. db.collectionName.find() shows list of Documents 
// 4. use dbsName , Creates the dataBase 
// 5. dbsName.createCollection('collectionName') creates collection
// 6. dbsName.collectionName.insertOne({document:1 , collection:1}) inserts a document 
// 7. dbsName.collectionName.insertMany([{document:1 , collection:1},{document:2 , collection:1}]) inserts multiple docs
// 8. dbs.collectionName.find({keyValue:{$LOGICALCONDITION:pair}})
//      Comparison Operators: $eq, $ne, $gt, $gte, $lt, $lte, $in
//      Logical Operators: $and, $or, $not, $nor
// 9. db.collectionName.find({document:{$gt:1}}).sort({document:-1}) 1 is ascending -1 descending
// 10. db.collectionName.limit(5) used to limit and filter the results 
// 11. db.collectionName.skip(5) used for pagination  
//     db.users.find().skip(10).limit(5) skips first 10 and limits to 5

//! CRUD operations 
//! 1. CREATE 
// => use dbs creates a Database 
// => db.createCollection('collectionName') creates a collection
// => db.collection.insertOne({key:value}) creates a document 
// => db.collection.insertMany([{key:value},{key:value},{key:value}]) creates a multiple docs

//! 2. READ
// => db.collection.find() lists all docs of that collection
// => db.collection.find(query,projection,option)  
// => db.collection.find(query) db.collection.find({age:{$gt:18}}) gives only those docs which are > 18
// => db.collection.find(query,projection) db.collection.find({},{age:1}) gives only age info remaining all are hided 1 shows 0 hides             
// => db.collection.find(query,projection,option) db.collection.find({},{}.{{ limit: 10, sort: { age: 1 }}) list 10 results sorted by age
// => EXAMPLE :
// => db.users.find(
// =>     { age: { $gt: 25 } },  // Query: Find users older than 25
// =>     { name: 1, email: 1 }, // Projection: Include only name and email
// =>     { limit: 10, sort: { name: 1 } } // Options: Limit to 10 results, sorted by name
// =>   )

//! 3. UPDATE 
// => db.collection.updateOne(filter, update) //updates First document 
// => db.collection.updateOne({_id: objectId('12345')},{$set:{name:"loki"}}}) 
// => Example :
// => db.users.updateOne(
// =>    { _id: ObjectId("12345") }, // Filter: Find the document with this ID
// =>    { $set: { name: "Jane Doe", age: 30 } } // Update: Change name and age
// => )
// => $set: To set a field to a new value.
// => $unset: To remove a field.
// => $inc: To increase a numeric field by a specified amount. 
// => db.collection.updateMany(filter, update) //updates All documents
// => EXAMPLE : 
// => db.users.updateMany(
// =>    { age: { $lt: 18 } }, // Filter: Find all users younger than 18
// =>    { $set: { status: "minor" } } // Update: Set status to "minor"
// => )

//! 3.1 REPLACE
// => db.collection.replaceOne(filter, replacement, opts)
// => EXAMPLE :
// => db.users.replaceOne(
// =>    { _id: ObjectId("12345") }, // Filter: Find the document with this ID
// =>    {                       // Replacement: New document
// =>        name: "Jane Doe",
// =>        age: 30,
// =>        email: "jane.doe@example.com"
// =>    },
// =>    { upsert: true } // Options: Create a new document if none found
// => )

//! 4. DELETE
// => db.collection.deleteOne(filter) 
// => EXAMPLE 
// => db.users.deleteOne({ _id: ObjectId("12345") })
// => db.collection.deleteMany(filter)    
// => EXAMPLE
// => db.users.deleteMany({ status: "inactive" })

//! IN JAVASCRIPT USING MONGODB (don't concentrate not that use)
// const { MongoClient, ObjectId } = require('mongodb');

// async function run() {
//     // Connection URL
//     const url = 'mongodb://localhost:27017';
//     const client = new MongoClient(url);

//     try {
//         // Connect to the database
//         await client.connect();
//         const db = client.db('yourDatabaseName'); // Replace with your database name
        
//         // 1. CREATE
//         // Create a collection
//         await db.createCollection('collectionName');
        
//         // Insert one document
//         await db.collection('collectionName').insertOne({ key: 'value' });
        
//         // Insert multiple documents
//         await db.collection('collectionName').insertMany([
//             { key: 'value1' },
//             { key: 'value2' },
//             { key: 'value3' },
//             { age: 20 },  // Added for further READ operations
//             { age: 30 },  // Added for further READ operations
//             { age: 15 }   // Added for further READ operations
//         ]);

//         // 2. READ
//         // Find all documents
//         const allDocs = await db.collection('collectionName').find().toArray();
//         console.log("All Documents:", allDocs);

//         // Find with query (age > 18)
//         const docsAbove18 = await db.collection('collectionName').find({ age: { $gt: 18 } }).toArray();
//         console.log("Documents with age > 18:", docsAbove18);

//         // Find with projection (show only age)
//         const ages = await db.collection('collectionName').find({}, { projection: { age: 1 } }).toArray();
//         console.log("Ages:", ages);

//         // Find with query, projection, and options (limit and sort)
//         const sortedLimitedResults = await db.collection('collectionName').find(
//             { age: { $gt: 25 } },
//             { projection: { name: 1, email: 1 } }
//         ).sort({ name: 1 }).limit(10).toArray();
//         console.log("Sorted and Limited Results:", sortedLimitedResults);

//         // 3. UPDATE
//         // Update one document
//         await db.collection('collectionName').updateOne(
//             { key: 'value' }, // Using key to identify the document
//             { $set: { name: "Jane Doe", age: 30 } }
//         );

//         // Update many documents
//         await db.collection('collectionName').updateMany(
//             { age: { $lt: 18 } },
//             { $set: { status: "minor" } }
//         );

//         // 3.1 REPLACE
//         // Replace one document (make sure it exists)
//         await db.collection('collectionName').replaceOne(
//             { key: 'value' },
//             {
//                 name: "Jane Doe",
//                 age: 30,
//                 email: "jane.doe@example.com"
//             },
//             { upsert: true }
//         );

//         // 4. DELETE
//         // Delete one document (make sure it exists)
//         await db.collection('collectionName').deleteOne({ key: 'value' });

//         // Delete many documents
//         await db.collection('collectionName').deleteMany({ status: "inactive" });

//     } catch (error) {
//         console.error("Error during operations:", error);
//     } finally {
//         // Close the connection
//         await client.close();
//     }
// }

// run().catch(console.dir);

//! IN JAVASCRIPT USING MONGOOSE (Very IMP!)
// const mongoose = require('mongoose');

// // Connect to MongoDB
// const url = 'mongodb://localhost:27017/mongoDB'; 
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// // Define a schema
// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//     status: String
// });

// // Create a model
// const User = mongoose.model('User', userSchema);

// async function run() {
//     try {
//         // 1. CREATE
//         // Insert one document
//         const user1 = new User({ name: 'John Doe', age: 28, email: 'john.doe@example.com' });
//         await user1.save();

//         // Insert multiple documents
//         await User.insertMany([
//             { name: 'Jane Doe', age: 22, email: 'jane.doe@example.com' },
//             { name: 'Sam Smith', age: 15, email: 'sam.smith@example.com' },
//             { name: 'Alice Johnson', age: 30, email: 'alice.johnson@example.com' }
//         ]);

//         // 2. READ
//         // Find all documents
//         const allUsers = await User.find();
//         console.log("All Users:", allUsers);

//         // Find with query (age > 18)
//         const usersAbove18 = await User.find({ age: { $gt: 18 } });
//         console.log("Users with age > 18:", usersAbove18);

//         // Find with projection (show only name and age)
//         const userAges = await User.find({}, { name: 1, age: 1 });
//         console.log("User Names and Ages:", userAges);

//         // 3. UPDATE
//         // Update one document
//         await User.updateOne(
//             { name: 'John Doe' },
//             { $set: { age: 29 } }
//         );

//         // Update many documents
//         await User.updateMany(
//             { age: { $lt: 18 } },
//             { $set: { status: "minor" } }
//         );

//         // 3.1 REPLACE
//         // Replace one document
//         await User.replaceOne(
//             { name: 'Jane Doe' },
//             {
//                 name: "Jane Smith",
//                 age: 25,
//                 email: "jane.smith@example.com",
//                 status: "adult"
//             }
//         );

//         // 4. DELETE
//         // Delete one document
//         await User.deleteOne({ name: 'John Doe' });

//         // Delete many documents
//         await User.deleteMany({ status: "minor" });

//     } catch (error) {
//         console.error("Error during operations:", error);
//     } finally {
//         // Close the connection
//         mongoose.connection.close();
//     }
// }

// run().catch(console.dir);
