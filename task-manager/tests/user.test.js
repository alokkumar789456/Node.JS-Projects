import request from "supertest";
import app from "../src/app";
import User from "../src/db/model/model-user";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Eminem",
  email: "eminem@gmail.com",
  password: "mockingbird!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT),
    },
  ],
};

// Runs before each test
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

// Runs after each test
afterEach(() => {
  console.log("after each");
});

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
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

// Testing for invalid credentials
test("non existent User!", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "passPassword",
    })
    .expect(400);
});

// fetching user profiles
test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
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
      .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
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
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','/tests/fixtures/avatar.jpg')
    .expect(200)
})