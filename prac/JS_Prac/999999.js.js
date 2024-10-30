//? js - js is a language
//? object-oriented language - anything in js considered as object

//! References
//! GFG
//! https://www.javascripttutorial.net/

//! Data Types
//? primitive (Basic form of data type )
//? immutable, meaning that they cannot be modified once created.
//? null, undefined, string, boolean, number, symbol, bigint
//? Null == Undefined

// const a = null;
// console.log("a: ", typeof(a)); // null

// const b = "b";
// console.log("b: ", typeof b); // String

// const c = true;
// console.log("c: ", typeof(c)); // boolean

// const d = 3;
// console.log("d: ", typeof d); // Number
// //? NAN is a number (numeric value)
//! types of Number https://www.javascripttutorial.net/javascript-number/

// console.log("a" / 2, "is a number it came when we divided it by a by 2"); // Nan
// const e = Symbol('description1'); // Symbols , is unique Char
// const e1 = Symbol('description1'); // This is a different symbol, even though the description is the same
// console.log( "e:", typeof(e), "&& e1:", typeof(e1) ,e === e1 , "when checked that they are equal"); // Output: false

// // BigInt larger than 2^53 – 1
// const f = 7243687125617n; // n is written at last to say that its bigInt to JS
// console.log("f: ",typeof(f));

//! var let Const
//? var can be initialized, declared, reinitialized, redeclared
// var a;
// var a = 'b'
// a = 3

//? let cannot be redeclared can be initialized, declared, reinitialized
// let a = 'b'
// a = 3

//? const cannot be redeclared, reinitialized can be initialized and declared but at the same time
// const a = "b"

//! statements
// console.log("this is a statement");

//! Scopes
//! block // anything inside the the Curly braces
// block = true
// if(block){
//     console.log("anything inside");
//     console.log("curly braces");
//     console.log("are part of Block");
// }

//! variable scopes
//! global scope // which is accessible anywhere
//! Block // Which is accessible only inside block

//! types of consoles

// console.log("Hello World! I Don't Give a Bug");

// console.error("This is the error statement")

// console.warn("this is a warn statement")

// console.table({'a':1, 'b':2});

// console.time('abc')
// setTimeout(()=>{console.log('siuuuuuuuuu!')},9000)
// console.timeEnd('abc')

// for (let i = 0; i < 5; i++) {
//     console.count(i);

// }

//! console.group() and console.groupEnd() method
// console.group('simple');
//   console.warn('warning!');
//   console.error('error here');
//   console.log('viii vina vice');
// console.groupEnd('simple');
// console.log('new section');

//! Custom Console log example
// const spacing = '10px';
// const styles =
//   `padding: ${spacing}; background-color: white; color: green; font-style:
//    italic; border: 1px solid black; font-size: 2em;`;
// console.log('%cGeeks for Geeks', styles);

//! to clear console
// console.clear();

//! Types of JavaScript Operators
//! w3 school
//! Arithmetic Operators
// Operator	    Description
//    +	        Addition
//    -	        Subtraction
//    *	        Multiplication
//    **	    Exponentiation (ES2016)
//    /	        Division
//    %	        Modulus (Division Remainder)
//    ++	    Increment
//    --	    Decrement

//! Assignment Operators
// Operator	   Example	    Same As
//    =	       x = y	    x = y
//    +=	   x += y	    x = x + y
//    -=	   x -= y	    x = x - y
//    *=	   x *= y	    x = x * y
//    /=	   x /= y	    x = x / y
//    %=	   x %= y	    x = x % y
//    **=	   x **= y	    x = x ** y

//! Comparison Operators
// Operator	 Description
//    ==	 equal to
//    ===	 equal value and equal type
//    !=	 not equal
//    !==	 not equal value or not equal type
//    >	     greater than
//    <	     less than
//    >=	 greater than or equal to
//    <=	 less than or equal to
//    ?	     ternary operator

//! array methods
// const arr = [10,20,30,40,50]
// console.log("OG:      ",arr);
// const arrPush = arr.push(10)
// console.log("Push:    ",arr);
// const arrPOP = arr.pop()
// console.log("POP:     ",arr);
// const arrShift = arr.shift()
// console.log("Shift:   ",arr);
// const arrUnshift = arr.unshift(10)
// console.log("Unshift: ",arr);

//! Given an array arr[] and an integer k where k is smaller than the size of
//! the array, the task is to find the kth smallest element in the given array.
//! Follow up: Don't solve it using the inbuilt sort function.
//! Examples :
//! Input: arr[] = [7, 10, 4, 3, 20, 15], k = 3
//! Output:  7
//! Explanation: 3rd smallest element in the given array is 7.
//! Input: arr[] = [2, 3, 1, 20, 15], k = 4
//! Output: 15
//! Explanation: 4th smallest element in the given array is 15.
//! Expected Time Complexity: O(n+(max_element) )
//! Expected Auxiliary Space: O(max_element)
//! Constraints:
//! 1 <= arr.size <= 106
//! 1<= arr[i] <= 106
//! 1 <= k <= n

// function kthSmallest(arr, k) {
//     arr.sort((a, b) => a - b); // Sort array in ascending order
//     return arr[k - 1]; // Return the k-th smallest element
// }

// const arr = [12, 3, 5, 7, 19];
// const k = 2;
// console.log(kthSmallest(arr, k)); // Output: 5

//! 2.
// const arr = [12, 3, 5, 7, 19];
// console.log("OG: ",arr);
// const arr2 = arr.sort()
// console.log("Sorted: ",arr2)
// console.log("maximum Element: ", arr2[0]);
// console.log("minimum Element: ",arr2[arr.length-1]);

//! 3.
// const arr = [0, 2, 1, 2, 2, 0, 1, 0, 1, 2, 1, 2];
// console.log(arr);
// const arr0 = [];
// const arr1 = [];
// const arr2 = [];
// arr.map((i) => {
//   if (i == 0) {
//     arr0.push(0);
//     return arr0;
//   }
//   if (i == 1) {
//     arr1.push(1);
//     return arr1;
//   }
//   if (i == 2) {
//     arr2.push(2);
//     return arr2;
//   }
// });
// console.log("sorted Array: ", arr0.concat(arr1, arr2));

//! Create a function which returns the number of true values there are in an array.
//! countTrue([true, false, false, true, false]) ➞ 2
//! countTrue([false, false, false, false]) ➞ 0
//! countTrue([]) ➞ 0
// let count = 0;
// const countTrue = () => {
//   arr = [true, false, true, false, true];

//   arr.map((i) => {
//     if (i === true) count = count + 1;
//     return count
//   });
// };
// countTrue();
// console.log("Count Value: ", count);

//! Move Capital Letters to the Front
//! Create a function that moves all capital letters to the front of a word.
//! Examples
//! capToFront("hApPy") ➞ "APhpy"
//! capToFront("moveMENT") ➞ "MENTmove"

// const letter = "paBlOescoBar!"
// const arrCaps = [];
// const arrSmall = []
// const capsFront =  ()=>{
//     for (let i = 0; i < letter.length; i++) {
//         if(letter[i] >='A' && letter[i]<="Z") arrCaps.push(letter[i])
//             else arrSmall.push(letter[i])
//         }
// }

// capsFront()
// console.log(arrCaps.concat(arrSmall).join(''));

//! According to the lodash documentation, _.compact creates an array with all falsey
//! values removed. The values false, null, 0, "", undefined, and NaN are falsey.
//! Your task is to build this helper function without using lodash.
//! You will write a function that receives an array and removes all falsey values.
//! Examples :
//! compact([0, 1, false, 2, "", 3]);   // => [1, 2, 3]

// const arr = [0, 1, false, 2, "", 3]
// const arrFilter = []
// const compact = ()=>{
//     arr.map((i)=>{
//         if(!false && null && 0 && "" && undefined && NaN) arrFilter.push(i);
//     })
// }

// compact()
// console.log(arrFilter);

//! function to remove falsey values like 0, false, ""
// const arr = [0, 1, false, 2, "", 3];
// const arrFilter = [];
// const compact = () => {
//   arr.forEach((i) => {
//     if (i) arrFilter.push(i);
//   });
// };
// compact();
// console.log(arrFilter);

//! Write a function that returns an anonymous function, which transforms its input by 
//! adding a particular suffix at the end.
//! Examples:
//! add_ly = add_suffix("ly");
//! add_ly("hopeless") ➞ "hopelessly";
//! add_ly("total") ➞ "totally";
//! add_less = add_suffix("less");
//! add_less("fear") ➞ "fearless";
//! add_less("ruth") ➞ "ruthless";

const suffixAdder = (word)=>{
    
}
