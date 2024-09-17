import request from "supertest";
import Task from "../src/db/model/model-task";
import testDb from "./fixtures/db.js";
import app from "../src/app";

// Runs before each test
beforeEach(testDb.setupDatabase);

// Test to create a Task for the User
test("create a Task for the User", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${testDb.userOne.tokens[0].token}`)
    .send({
      description: "From My Test",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

// tests To Read tasks
test("Should test user Task", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${testDb.userOne.tokens[0].token}`)
    .expect(200);
  expect(response.body.length).toEqual(2);
});

// test to delete Tasks of Auth User / should not delete other users Tasks 
test('delete Tasks of Auth User', async () => {
    const response = await request(app)
        .delete(`/tasks/${testDb.taskOne._id}`)
        .set("Authorization", `Bearer ${testDb.userTwo.tokens[0].token}`)
        .send()
        .expect(500);
        const task = await Task.findById(testDb.taskOne._id)
        expect(task).not.toBeNull()
});