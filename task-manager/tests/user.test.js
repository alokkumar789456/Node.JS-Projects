import request from "supertest";
import app from "../src/app";
import User from "../src/db/model/model-user";
import dotenv from "dotenv";
import path from "path"
import testDb from './fixtures/db.js'

const avatarPath = path.join(__dirname, 'fixtures', 'avatar.jpg');
dotenv.config();


// Runs before each test
beforeEach(testDb.setupDatabase);

// Runs after each test
// afterEach(() => {
//   console.log("after each");
// });

// Testing for creating an account
test('sign up user', async () => {
    // Send a POST request to the /users endpoint
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Alok',
        email: 'alokkumar77954@gmail.com',
        password: 'alokkumar77954@gmail.com'
      })
      .expect(201); // Expect a 201 Created status code
  
    // Assert that the response body contains a user object with an _id
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('_id');
  
    // Query the database to find the user by the ID from the response
    const user = await User.findById(response.body.user._id);
    
    // Assert that the user is not null
    expect(user).not.toBeNull();
  });
  

// Testing for login credentials
test("should Login Existing User", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: testDb.userOne.email,
      password: testDb.userOne.password,
    })
    .expect(200);
});

// Testing for invalid credentials
test("non existent User!", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: testDb.userOne.email,
      password: "passPassword",
    })
    .expect(400);
});

// fetching user profiles
test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set('Authorization',`Bearer ${testDb.userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

//testing should not fetch user for unauthenticated users 
test('should not fetch user for unauthenticated users',async()=>{
        await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

//test to delete a account 
test("should delete profile for user", async () => {
    await request(app)
      .delete("/users/me")
      .set('Authorization',`Bearer ${testDb.userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

//test failed authorization to delete user
test("should not delete profile for unAuthorized user", async () => {
    await request(app)
      .delete("/users/me")
      .set('Authorization',`Bearer Aybu09nnm2zu2s28g`)
      .send()
      .expect(401);
  });


//Test to Upload Avatar 
test('Should Upload a avatar Image',async ()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${testDb.userOne.tokens[0].token}`)
    .attach('avatar',avatarPath)
    .expect(200)
    //checks the image upload by checking the buffer 
    const user = await User.findById(testDb.userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should Update Valid user fields',async ()=>{
  await request(app)
  .patch('/users/me')
  .set('Authorization',`Bearer ${testDb.userOne.tokens[0].token}`)
  .send({
    name:'Alok'
  })
  .expect(200)
  const user = await User.findById(testDb.userOneId)
  expect(user.name).toEqual('Alok')
})


test('should Not Update InValid user fields',async ()=>{
  await request(app)
  .patch('/users/me')
  .set('Authorization',`Bearer ${testDb.userOne.tokens[0].token}`)
  .send({
    height:3.5
  })
  .expect(400)
})