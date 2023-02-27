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

  const tasksWithFormattedDuration = tasks.map((task) => ({
    ...task,
    duration: formatDuration(task.duration),
  }));
  const fields = ["name", "duration"];
  const rows = tasks.map((task) => ({
    name: task.name,
    duration: formatDuration(task.duration),
  }));
  const opts = { fields };
  const parser = new Parser(opts);
  const csvData = parser.parse(rows);
  fs.writeFileSync("../csv_files", csvData);
  const base64Data = Buffer.from(csvData).toString("base64");
  res.send({ csv: base64Data });
});

function formatDuration(durationInSeconds) {
  const dayInSeconds = 24 * 60 * 60;
  const hourInSeconds = 60 * 60;
  const minuteInSeconds = 60;

  if (durationInSeconds >= dayInSeconds) {
    const days = Math.floor(durationInSeconds / dayInSeconds);
    durationInSeconds %= dayInSeconds;
    const hours = Math.floor(durationInSeconds / hourInSeconds);
    return `${days}d ${hours}hr`;
  } else if (durationInSeconds >= hourInSeconds) {
    const hours = Math.floor(durationInSeconds / hourInSeconds);
    durationInSeconds %= hourInSeconds;
    const minutes = Math.floor(durationInSeconds / minuteInSeconds);
    return `${hours}hr ${minutes}min`;
  } else {
    const minutes = Math.floor(durationInSeconds / minuteInSeconds);
    return `${minutes}min`;
  }
}

module.exports = {
  statsRouter,
};
