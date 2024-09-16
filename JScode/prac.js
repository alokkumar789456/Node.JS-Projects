//! Write a function that takes a string as input and returns the string reversed.
//! For example, given "hello", the function should return "olleh".
// function reverseString() {
//     let str = process.argv[2]
//     let reverse = str.split('').reverse().join('')
//     console.log(reverse);
// }
// reverseString()
// console.log(process.argv[2]);

//!  Write a function that takes an array of numbers and returns a new array with only the even numbers.
// function filterEvenNumbers() {
//     let arr = [10,3,23,30,33,90,756]
//     let filtered = arr.filter((x)=>{return x%2==0})
//     console.log(filtered);
// }
// filterEvenNumbers()

//!  Given an object representing a person with properties firstName and lastName, write a function that returns 
//!  the full name in the format "firstName lastName".
// let person = {
//     firstName:"loki",
//     lastName:"AsGuard"
// }
// function getFullName() {
//     console.log(person.firstName+" "+person.lastName);    
// }
// getFullName()

//! Write a function that counts the number of occurrences of each character in a given string and returns 
//! an object where the keys are characters and the values are their counts.
//   function countCharacters() {
//     let str = process.argv[2];
//     let charCount = {};

//     str.split('').map(char => {
//         charCount[char] = (charCount[char] || 0) + 1;
//     });

//     console.log(charCount);
//     return charCount;
// }

// countCharacters();


//! Write a function that returns a promise that resolves with a message after a delay of 2 seconds.
// const funPromise = () => {
//    return new Promise((resolve) => {
//        setTimeout(() => {
//            resolve('promise return successful');
//        }, 2000);
//    });
// };

// funPromise().then((message) => {
//    console.log(message);
// });

//! function to return count of boolean values
// function returnTrue(arr) {
//     return arr.filter(value => value === true).length;
// }
// returnTrue([true,true,false])

//! Write a function redundant that takes in a string str and returns a function that returns str.
// function redundant(str){
//     return function CB() {
//         return str
//     }

// }

// const getString = redundant('Hello, world!');
// console.log(getString());

//! In a board game, a piece may advance 1-6 tiles forward depending on the number rolled on a 
//! six-sided die. If you advance your piece onto the same tile as another player's piece, both of you earn a bonus.
//! Can you reach your friend's tile number in the next roll? Create a function that takes 
//! your position a and your friend's position b and returns a boolean representation of whether it's 
//! possible to earn a bonus on any die roll.

// function prob(a,b) {
//     const difference = b - a;
//     return difference >= 1 && difference <= 6;
// }
// console.log(prob(1, 9));

