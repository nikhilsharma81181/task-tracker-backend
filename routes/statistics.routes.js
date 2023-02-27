const express = require("express");
const statsRouter = express.Router();
const { UserModel } = require("../models/user.model");
const { ProjectModel } = require("../models/project.model");
const { TaskModel } = require("../models/task.model");
const mongoose = require("mongoose");
const fs = require("fs");
const { Parser } = require("json2csv");

statsRouter.get("/:userID/:projectID", async (req, res) => {
  const userID = mongoose.Types.ObjectId(req.params.userID);
  const user = await UserModel.find({ _id: userID });
  console.log(user[0].name);
  const projectID = mongoose.Types.ObjectId(req.params.projectID);
  const project = await ProjectModel.find({ _id: projectID });
  console.log(project[0].name);
  const tasks = await TaskModel.find({ projectID });

  const fields = ["name", "duration"];
  const opts = { fields };
  const parser = new Parser(opts);
  const csvData = parser.parse(tasks);
  fs.writeFileSync("../csv_files", csvData);
  const base64Data = Buffer.from(csvData).toString("base64");
  res.send({ csv: base64Data });

  // const project = mongoose.Types.ObjectId(req.params.projectID);
  // console.log(project);
  // try {
  //   const tasks = await TaskModel.find({ projectID: project });
  //   res.json(tasks);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ msg: "Something went wrong" });
  // }
});

module.exports = {
  statsRouter,
};
