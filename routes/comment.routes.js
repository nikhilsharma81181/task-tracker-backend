const express = require("express");
const commentRouter = express.Router();
const { CommentModel } = require("../models/comment.model");
const mongoose = require("mongoose");

// Get all tasks by Project Id 

commentRouter.get("/all/:taskId", async (req, res) => {
  const taskId = mongoose.Types.ObjectId(req.params.taskId);
  try {
    const tasks = await CommentModel.find({ taskId });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Add  new task

commentRouter.post("/add", async (req, res) => {
  const taskId = req.body.taskId;
  const { text, time } = req.body;
  try {
    const newTask = new CommentModel({
      text,
      taskId,
      time,
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

commentRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  console.log(payload);
  try {
    await CommentModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Project edited successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Delete task by id

commentRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CommentModel.findByIdAndDelete({ _id: id });
    res.send("Project deleted successfull");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  commentRouter,
};
