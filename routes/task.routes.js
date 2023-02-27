const express = require("express");
const taskRouter = express.Router();
const { TaskModel } = require("../models/task.model");
const mongoose = require("mongoose");

// Get all tasks by Project Id

taskRouter.get("/all/:projectID", async (req, res) => {
  const project = mongoose.Types.ObjectId(req.params.projectID);
  console.log(project);
  try {
    const tasks = await TaskModel.find({ projectID: project });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Get all tasks of a user

taskRouter.get("/alltasks", async (req, res) => {
  const user = req.body.userID;
  try {
    const tasks = await TaskModel.find({ user });
    // const tasks = await TaskModel.find({ user, project }).populate("task");
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Add  new task

taskRouter.post("/add", async (req, res) => {
  const user = req.body.userID;
  const projectID = req.body.projectID;
  const { name, desc, status, initialTime, endTime } = req.body;
  const newInitTime = new Date(initialTime);
  const newEndTime = new Date(endTime);
  try {
    const newTask = new TaskModel({
      name,
      desc,
      user,
      projectID,
      status,
      newInitTime,
      newEndTime,
    });
    await newTask.save();
    console.log("Task added successfully");
    res.jsonp(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Update task by id

taskRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  console.log(payload);
  try {
    await TaskModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Project edited successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Delete task by id

taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.findByIdAndDelete({ _id: id });
    res.send("Project deleted successfull");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  taskRouter,
};
