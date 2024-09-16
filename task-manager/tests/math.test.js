//! For More Info read Docs : https://jestjs.io/docs/getting-started

//! ex of test (arg1='name',arg2=function) Pass Case
test("Test_1",()=>{
    console.log('this is the TEST');
})
//! ex of test (arg1='name',arg2=function) Fail Case
// test("Test_2",()=>{
//     throw new Error('this is the TEST!');
// })

//! Function definition with a return statement
// function add(a, b) {
//   return a + b ;
// }

//! Test function
//! ex1
// test("sum", () => {
//   const totalSum = add(2, 2);
//   if (totalSum !== 4) {
//     throw new Error(`total should be 4 but got ${totalSum}`);
//   }
// });
//! ex2
// test("sum", () => {
//     const totalSum = add(2, 2);
     
//     expect(totalSum).toBe(4) 

    //? if (totalSum !== 4) {
    //?   throw new Error(`total should be 4 but got ${totalSum}`);
    //? }
//   });
//! ex3 test for default sum assigned 
// function sub(a, b=2) {
//     return a - b ;
//   }

// test("subDefault Value",()=>{
//     const subSum = sub(4)
//     expect(subSum).toBe(2)
// })


//
//! Goal: Test temperature conversion functions
//
//! 1. Export both functions and load them into test suite
//! 2. Create "Should convert 32 F to 0 C"
//! 3. Create "Should convert 0 C to 32 F"
//! 4. Run the Jest to test your work!

// const fahrenheitToCelsius = (temp) => {
//     return (temp - 32) / 1.8
// }

// const celsiusToFahrenheit = (temp) => {
//     return (temp * 1.8) + 32
// }

// test("Conversion",()=>{
//     const test1 = fahrenheitToCelsius(32)
//     const test2 = celsiusToFahrenheit(0)

//     expect(test1).toBe(0)
//     expect(test2).toBe(32)
// })

//! Async Code
//! In this case The test function itself completes 
//! immediately, and the test framework considers the test as passed 
//! because it doesn’t wait for the asynchronous code to complete.
// test("testing Async Code!",()=>{
//     setTimeout(()=>{
//         expect(2).toBe(4)
//     },2000)
// })
//! instead pass done() when async code is completed 
// test("testing Async Code!",(done)=>{
//     setTimeout(()=>{
//         expect(2).toBe(4)
//         done()
//     },2000)
// })

//! function
// const add = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (a < 0 || b < 0) {
//                 return reject('Numbers must be non-negative')
//             }

//             resolve(a + b)
//         }, 2000)
//     })
// }

//! Ex1 
// test('Async Code',(done)=>{
//     add(2,3).then((sum)=>{
//         expect(sum).toBe(5)
//         done()
//     })
// })
//! Ex2 Async Await
// test('Async Await Should Add Two numbers',async ()=>{
//         const sum = await add(10,10)
//         expect(sum).toBe(20)
// })

