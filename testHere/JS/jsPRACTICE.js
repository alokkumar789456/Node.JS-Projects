//! two sum
// var twoSum = function (nums, target) {
//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             if (nums[j] === target - nums[i]) {
//                 return [i, j];
//             }
//         }
//     }
//     // In case there is no solution, return null
//     return null;
// };
// // Example usage
// const nums = [2, 7, 11, 15];
// const target = 9;
// console.log(twoSum(nums, target)); 

//! reverse the string 
// function reverseMe() {
//     const str = 'hello'
//     const str2 = str.split('').reverse().join('')
//     console.log(str2);
// }
// reverseMe()

//! obj is array or not 
// const arr = [1,2,3,3]
// console.log(Array.isArray(arr));

//! empty an array in js
// const arr = [1,2,3]
//  arr = [] //dumb way

// const arr2 = arr.map(()=>{
//     return ''
//  })

// console.log(arr2);

//! input : [1,2,3,4]
//! output : [1,2,3,4,1,2,3,4]
// const arr1 = [1,2,3,4]
// const arr2  = arr1.reverse().reverse()
// const arr = arr1.concat(arr2)
// console.log(arr);

//! reverse a number 
// function fire() {
//     const num = 1234;
//     const arr = Number(num.toString().split('').reverse().join(''))
//     console.log(arr);
//   }
//   fire();

//! palindrome 
// function flower(str1,str2) {
//     const a =str1.split('').sort().join('')
//     const b = str2.split('').sort().join('')
//     if (a===b) {
//         console.log('is palindrome');
//     } else {
//         console.log('not a palindrome');
//     } 
// }
// flower('flower','fire')

//! sorting the given string 
// function flower(str) {
//    const str1 = str.split('').sort().join('')
//    console.log(str1);
// }

// flower('sort')

//! converting first letter of thr string in uppercase
// function fire(str) {
//     const str1 = str.split(' ')
//     const res = str1.map((x)=>{
//         return x.charCodeAt(0).toUpperCase()+ x.slice(1);
//     })
//     console.log(res);
// }
// fire('never give up')

//! Median of two sorted values 
//! Input: nums1 = [1,2], nums2 = [3,4]
//! Output: 2.50000
//! Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5. //array will be sorted

// function flower(a, b) {
//     const c = a.concat(b)
//     // console.log(c);

//        // Sort the merged array //optional step
//        c.sort((x, y) => x - y);

//     if (c.length % 2 == 0) {
//         const middleIndex1 = Math.floor(c.length / 2) - 1;
//         const middleIndex2 = Math.floor(c.length / 2);
//         const median = c[middleIndex1]+c[middleIndex2] / 2 
//         console.log(median);

//     } else {
//         const middleIndex = Math.floor(c.length / 2);
//         console.log(c[middleIndex]);
//     }
// }
// flower([1, 2, 3, 4], [5, 6, 7, 8])

//! palindrome Number 
// function fire(a,b) {
//     const num1 = Number(a.toString().split('').sort().join(''))
//     const num2 = Number(b.toString().split('').sort().join(''))
//     if (num1===num2) {
//         console.log('is palindrome');
//     } else {
//         console.log('not a palindrome');
//     }
// }
// fire(121,121)

//! Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
//! Input: n = 3
//! Output: ["((()))","(()())","(())()","()(())","()()()"] 
//? Ignore Maar bahut tagda DSA Bhai dusra Try Kar
// function flower(n) {
//     const result = [];
//     function backtrack(current, open, close) {
//         if (current.length === 2 * n) {
//             result.push(current);
//             return;
//         }
//         if (open < n) {
//             backtrack(current + '(', open + 1, close);
//         }
//         if (close < open) {
//             backtrack(current + ')', open, close + 1);
//         }
//     }
//     backtrack('', 0, 0);
//     return result;
// }
// console.log(flower(3));

//! kids-with-the-greatest-number-of-candies
//? Input: candies = [2,3,5,1,3], extraCandies = 3
//? Output: [true,true,true,false,true] 
//? Explanation: If you give all extraCandies to:
//? - Kid 1, they will have 2 + 3 = 5 candies, which is the greatest among the kids.
//? - Kid 2, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
//? - Kid 3, they will have 5 + 3 = 8 candies, which is the greatest among the kids.
//? - Kid 4, they will have 1 + 3 = 4 candies, which is not the greatest among the kids.
//? - Kid 5, they will have 3 + 3 = 6 candies, which is the greatest among the kids.

// function fire(candies, extraCandies) {
//     const maxCandies = Math.max(...candies);
//     return candies.map(candy => candy + extraCandies >= maxCandies);
// }
// console.log(fire([1, 2, 3, 4, 5], 3))

//! Write a function createHelloWorld. It should return a new function that always returns "Hello World".
//! Input: args = []
//! Output: "Hello World"
//! Explanation:
//! const f = createHelloWorld();
//! f(); // "Hello World"
//! The function returned by createHelloWorld should always return "Hello World".

// function createHelloWorld() {
//     function returnHello(){
//         return "Hello world"
//     }
//     return returnHello()
// }

// console.log(createHelloWorld())

//! Given an integer n, return a counter function. This counter function initially returns n and then returns 1 
//! more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).
//! Example 1:
//! Input: 
//! n = 10 
//! ["call","call","call"]
//! Output: [10,11,12]
//! Explanation: 
//! counter() = 10 // The first time counter() is called, it returns n.
//! counter() = 11 // Returns 1 more than the previous time.
//! counter() = 12 // Returns 1 more than the previous time.

// var createCounter = function(n) {
//     return function() {
//       return n++;      
//     };
//   };

//   const counter = createCounter(10);

// console.log(counter()); 
// console.log(counter()); 
// console.log(counter());

//! Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
//! Output: [2,3,4]
//! Explanation:
//! const newArray = map(arr, plusone); // [2,3,4]
//! The function increases each value in the array by one. 
// function plusone(arr) {
//     arr.pop();
//     arr.push()
// }