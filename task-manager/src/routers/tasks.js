import express from "express";
import Task from "../db/model/model-task.js";
import auth from "../middleware/auth.js";

const taskRouter = express.Router();

// Route to create a new task
taskRouter.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(400).send(err);
  }
});

// Route to send multiple tasks at a time
taskRouter.post("/tasks", async (req, res) => {
  try {
    const tasks = req.body; // Assuming req.body is an array of tasks
    const savedTasks = await Task.insertMany(tasks);
    res.status(201).send(savedTasks);
  } catch (err) {
    console.error("Error saving tasks:", err);
    res.status(400).send(err);
  }
});

// Route to list all the tasks
taskRouter.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {}; // Consistent variable name for sorting criteria
  
  // Filter tasks based on completion status
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  
  // Parse limit and skip query parameters
  const limit = parseInt(req.query.limit) || 10; // Default to 10 if not provided
  const skip = parseInt(req.query.skip) || 0;    // Default to 0 if not provided

  // Parse sorting criteria from query parameter
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':'); // Split sortBy parameter
    if (parts.length === 2) {
      const field = parts[0];
      const order = parts[1];
      sort[field] = order === 'desc' ? -1 : 1; // Set sort direction
    }
  } else {
    sort.createdAt = -1; // Default sorting by createdAt in descending order
  }

  try {
    // const tasks = await Task.findById({owner:req.user._id});
    // Params {{url}}/tasks?limit=0&skip=0&completed=true
    // completed=true // filters only that data which is true
    // limit=0  //data to be displayed in single page
    // skip=0   // set of data to be skipped
    // createdAt: -1 ,completed :-1 //used to sort here -1 indicates descending order or completed can be any data
    const tasks = await Task.find({ owner: req.user._id, ...match })
    .limit(limit)
    .skip(skip)
    .sort(sort);

  res.send(tasks);
} catch (err) {
  res.status(500).send({ error: 'An error occurred while fetching tasks' });
}
});

// Route to access specific task
taskRouter.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("USER IS NOT AUTHORIZED");
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

// Route to update a task
taskRouter.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates! Allowed updates are: 'description', 'completed'",
    });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

// Route to delete a task
taskRouter.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const deletedTask = await Task.remove({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!deletedTask) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "User is Not Authorized" });
  }
});

export default taskRouter;
