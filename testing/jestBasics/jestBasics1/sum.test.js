const mongoose = require('mongoose')
const sum = require('./sum.js')

//! ex 
test("Adding up two numbers", ()=>{
    expect(sum(1,2)).toBe(3)
})

//! how expect toBe is worked 
test("sum of two + two",()=>{
    expect(2+2).toBe(4)
})

//! Object assignment  (checks whether the key value pair is present or not)
test("Checking the object",()=>{
    const data = { "One": 1 };
    data['two'] = 2;
    expect(data).toEqual({'two':2,"One":1});
})


//! not is used to check a specific object 
test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

//! ex 2 
test("2 + 2 is not 0",()=>{
    expect(2+2).not.toBe(0)
})


//! toBeNull matches only null
//! toBeUndefined matches only undefined
//! toBeDefined is the opposite of toBeUndefined
//! toBeTruthy matches anything that an if statement treats as true
//! toBeFalsy matches anything that an if statement treats as false

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

//! match using string 
test("Checking wether the A is Present in Apple or Not",()=>{
    expect("Apple").toMatch(/A/)
})

test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });


//! checking array/ iterable objects  
const characters = ["naruto","kakashi","sasuke","ucchia madara"]

test("checking the element is present or not",()=>{
    expect(characters).toContain("naruto")
})

test("Checking 7 in loop",()=>{
    for (let i = 0; i < 10; i++) {
        if(i===7){
            expect(i).toBe(7)   
        } 
    }
})

//! testing Async Code 
const fetchData = () => {
    return new Promise((resolve) => {
        const data = "world war declared";
        setTimeout(() => resolve(data), 100); 
    });
};

test("Testing Async Code", async () => {
    const data = await fetchData(); 
    expect(data).toBe("world war declared");
});

// Test 2
const testAsync = mongoose
    .connect("mongodb://localhost:27017/jestTest")
    .then(() => {
        console.log("Connected correctly");
        return "Connected correctly";
    })
    .catch(() => {
        console.log("Error");
        return "Error";
    });

test("Test 2 of async Code", async () => {
    const result = await testAsync;
    expect(result).toBe("Connected correctly");
    expect(result).not.toBe("Error");
});


// test 3 
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("jestTest","root","Root.@123",{
    host:"localhost",
    dialect:"mysql",
    port:3306
})

sequelize.authenticate()
.then(()=>{
    console.log("Authenticated");
})
.catch((err)=>{
    console.error("not Authenticated: ",err);
})

sequelize.sync()
.then(()=>{
    console.log("Synced");
})
.catch((err)=>{
    console.error("not Synced: ",err);
})

test("testing sequelize Connection",async ()=>{
    try {
        await sequelize.authenticate();
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeNull();
      }
})

//! use of BeforeEach 
//! use of AfterEach 
//! use of BeforeAll
//! use of AfterAll

