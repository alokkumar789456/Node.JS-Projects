import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../src/db/model/model-user";
import Task from "../../src/db/model/model-task";

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

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "snoop",
  email: "Snoop@gmail.com",
  password: "lastlast!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First Test Task!",
  completed: false,
  owner: userOneId._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second Test Task!",
  completed: true,
  owner: userOneId._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third Test Task!",
  completed: true,
  owner: userTwoId._id,
};
const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

export default {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
