//! Write a function that takes a string and returns it reversed.
//! Example: reverseString("hello") should return "olleh".

function str(s) {
    return s.split('').reverse().join('');
}
str()

//! Write a function that prints numbers from 1 to 100. For multiples of three, print “Fizz” instead of the number,
//! and for multiples of five, print “Buzz”. For numbers which are multiples of both three and five, print “FizzBuzz”.
//! Example: fizzBuzz() should output 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, ...

function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i %5===0 && i%3===0) {
            console.log('FizzBuzz');
        } else if (i % 3 == 0) {
            console.log('Fizz');
        } else if (i % 5 == 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
}
fizzBuzz();

//! Write a function that calculates the factorial of a given number.
//! Example: factorial(5) should return 120 (5 * 4 * 3 * 2 * 1).

function factorial(n) {
    if (n < 0) {
        console.log("non-negative integer.");
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(5))
