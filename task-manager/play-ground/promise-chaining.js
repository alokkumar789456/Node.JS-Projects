
//! put them in then block if u wanna run this (index.js)
// Call updateAgeCount after the connection is established
// updateAgeCount('66c82374b9964f7c2f5bf8a6', 2233)
//     .then((count) => {
//         console.log(count);
//     })
//     .catch((Error) => {
//         throw Error;
//     });

//deleteTaskAndCount
// deleteTaskAndCount("66c70c3a7e430b5849cac822",true)
// .then((count)=>{
//     console.log(count);
// }).catch((err)=>{throw err})

//! in index.js 
// //updateAgeCount
// const updateAgeCount = async (id, age) => {
//     if (mongoose.connection.readyState === 1) {
//         const user = await User.findByIdAndUpdate(id, { age });
//         const count = await User.countDocuments({ age });
//         return count;
//     } else {
//         console.error('MongoDB connection is not ready');
//     }
// };

// //deleteTaskAndCount
// const deleteTaskAndCount = async (id, completed) => {
//     if (mongoose.connection.readyState === 1) {
//         const task = await Task.findByIdAndDelete(id);
//         const count = await Task.countDocuments({ completed });
//         return count;
//     } else {
//         console.error('MongoDB connection is not ready');
//     }
// }