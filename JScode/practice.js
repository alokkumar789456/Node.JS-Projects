//! Write a function that takes a string as input and returns the string reversed.
//! For example, given "hello", the function should return "olleh".
// function reverseString() {
//     let str = process.argv[2]
//     let reverse = str.split('').reverse().join('')
//     console.log(reverse);
// }
// reverseString()
// console.log(process.argv[2]);

// const { max } = require("lodash");

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

//! Write a function that converts an
//! object into an array, where each element represents a key-value pair in the form of an array.
//! toArray({ a: 1, b: 2 }) ➞ [["a", 1], ["b", 2]]
//! toArray({ shrimp: 15, tots: 12 }) ➞ [["shrimp", 15], ["tots", 12]]
//! toArray({}) ➞ []

// const obj = {a:1,b:2};
// const arrKeys = Object.keys(obj);
// const arrValues = Object.values(obj);
// const length = arrKeys.length;
// const arr = [];
// for (let i = 0; i < length; i++) {
//     arr.push([arrKeys[i],arrValues[i]])
// }
// console.log(arr);

//! Create a function that concatenates n input arrays, where n is variable.
//! concat([1, 2, 3], [4, 5], [6, 7]) ➞ [1, 2, 3, 4, 5, 6, 7]
//! concat([1], [2], [3], [4], [5], [6], [7]) ➞ [1, 2, 3, 4, 5, 6, 7]
//! concat([1, 2], [3, 4]) ➞ [1, 2, 3, 4]
//! concat([4, 4, 4, 4, 4]) ➞ [4, 4, 4, 4, 4]

// const arr = [ [ 'a', 1 ], [ 'b', 2 ] ]
// for (let i = 0; i < arr.length; i++) {
//     arr[i].push()
// }
// console.log(arr);

//! Create a function that takes an array of numbers and return "Boom!" if the
//! digit 7 appears in the array. Otherwise, return "there is no 7 in the array".
//! ex :
//! sevenBoom([1, 2, 3, 4, 5, 6, 7]) ➞ "Boom!"
//! 7 contains the number seven.
//! sevenBoom([8, 6, 33, 100]) ➞ "there is no 7 in the array"
//! None of the items contain 7 within them.

// const arr = [ 1,2,3,4,56,8,9,7,47]

// const Boom = ()=>{
//     const seven = arr.filter( i => i === 7)
//     if(seven[0]=== 7) console.log("Boom!");
//     else console.log("There is no seven in the array");
// }

// Boom();

//! There are three towers. The objective of the game is to move all the disks over to tower #3,
//! but you can't place a larger disk onto a smaller disk. To play the game or learn more about
//! the Tower of Hanoi, check the Resources tab.
//! Create a function that takes a number discs as an argument and returns the minimum
//! amount of steps needed to complete the game.
//! example
//! towerHanoi(3) ➞ 7
//! towerHanoi(5) ➞ 31
//! towerHanoi(0) ➞ 0

// function towerHanoi(discs) {
//   // If there are no discs, no moves are needed
//   if (discs === 0) return 0;
//   return Math.pow(2, discs) - 1;
// }

// // Example works on 2^n - 1 formula to find minimum moves
// console.log(towerHanoi(3)); // ➞ 7

//! lodash library
// var _ = require("lodash");

// const chunk = _.chunk(["a", "b", "c", "d"], 2);
// console.log(chunk); // chunks the size

// const compact = _.compact([0, 1, false, "", undefined]);
// console.log(compact); // removes all falsey values like  ('', 0, undefined)

//! guess the output ?
// let a = {};
// let b = { key: "b" };
// let c = { key: "c" };

// a[b] = 123;
// a[c] = 456;
// console.log(c.toString());
// console.log(a[b]);

//! Write a function in JavaScript that takes an array of numbers and returns the sum of all positive numbers in the array.

// const positiveArr = (arr) => {
//   if (Array.isArray(arr) != true) {
//     console.log("Argument Should be an array ");
//     return;
//   }
//   const sum = arr.reduce((acc, current) => {
//     return current > 0 ? acc + current : acc;
//   }, 0);
//   console.log(sum);
// };
// positiveArr([1, 2, 3, -1]);

//! Write a function in JavaScript that takes a string as input and returns a new string with all the vowels removed.
// const word = "WORLD"
// for (let i = 0; i < word.length; i++) {
//     if (!"aeiouAEIOU".includes(word[i])) console.log(word[i]);
// }

//! Write a function in JavaScript that takes an array of strings as input and returns a new array with the strings
//! sorted in alphabetical order.
// const arr =  ["ball","Apple","dog","cat"]
// const sortedArr = arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
// console.log(sortedArr);

//! Write a function in JavaScript that finds the second highest number in an array of numbers.
// const arr = [4, 5, 6, 1, 2, 3, 7, 8, 9];
// const secondMax = Math.max(...arr) - 1
// console.log(secondMax);

//! Given a number, n, return a function which adds n to the number passed to it.
// const add1 = (a) => {
//   const add2 = (b) => {
//     return (sum = a + b);
//   };
//   return add2;
// };
// console.log(add1(10)(20));

