//! callbacks 
// setTimeout(() => {
//     console.log('This is a callback function');
// }, 2000)

//! filter callback 
// let names = ['loki', 'thorAsguard', 'thanos', 'Spider-Man', 'Doctor-Strange']
// let shortname = names.filter((name) => name.length <= 6)
// console.log(shortname);

//! Goal: Mess around with the callback pattern
//! 1. Define an add function that accepts the correct arguments
//! 2. Use setTimeout to simulate a 2 second delay
//! 3. After 2 seconds are up, call the callback function with the sum
//! 4. Test your work!

// let add = (a, b, summ) => {
//     setTimeout(() => {
//         let sum = a + b
//         summ(sum)
//     }, 2000)
// }
// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })

