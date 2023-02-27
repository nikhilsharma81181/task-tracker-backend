const express = require("express");
const projectRouter = express.Router();
const { ProjectModel } = require("../models/project.model");
const mongoose = require("mongoose");

// Get all projects

projectRouter.get("/all/:id", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id);
  try {
    const data = await ProjectModel.find({ user: userId });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Get projects by projectID

projectRouter.get("/:id", async (req, res) => {
  const { projectID } = req.params;
  try {
    const data = await ProjectModel.find({ _id: projectID });
    console.log(data);
    res.json("sent");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Create new project

projectRouter.post("/create", async (req, res) => {
  const user = req.body.userID;
  const { name, des, color } = req.body;
  console.log(`${user} ${name} ${color}`);
  try {
    const newProject = new ProjectModel({ name, des, user, color });
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Update project by id

projectRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  console.log(payload);
  try {
    await ProjectModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Project edited successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Delete project by id

projectRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ProjectModel.findByIdAndDelete({ _id: id });
    res.send("Project deleted successfull");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  projectRouter,
};
