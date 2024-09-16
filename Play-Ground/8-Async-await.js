// const add = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b)
//         }, 2000)
//     })
// }

// let doWork = async () => {
//! throws the error
// throw console.error('Opps! Something went Wrong');
// return 'LOKI'
// }
// console.log(doWork())
// await add(1,99)
//! Then and Catch block
// doWork()
//! prints the returned promise
// .then((result) => { console.log(result); })
//! prints th error of the promise
// .catch((err) => { throw err })

//! Best example because i understood 
// let fetchData = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let success = false; //! if true if statement , false else statement 
//             if (success) {
//                 resolve('data fetched successfully');
//             } else {
//                 reject('something went wrong!');
//             }
//         }, 2000)
//     })
// }
// fetchData()
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((err) => { console.log(err); })

