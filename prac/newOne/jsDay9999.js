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
