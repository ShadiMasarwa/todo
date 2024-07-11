const express = require("express");
const taskRouters = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const FILENAME = "./data/data.json";

const readData = () => {
  const data = fs.readFileSync(FILENAME);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(FILENAME, JSON.stringify(data, null, 2));
};

taskRouters.get("/", (req, res) => {
  const tasks = readData();
  res.json(tasks);
});

taskRouters.post("/", (req, res) => {
  const tasks = readData();
  const newTask = { id: uuidv4(), done: false, text: req.body.text };
  tasks.push(newTask);
  writeData(tasks);
  res.status(200).json(newTask);
});

taskRouters.put("/:id", (req, res) => {
  const tasks = readData();
  const taskIndex = tasks.findIndex((task) => task.id === req.params.id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeData(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).send("Task not found");
  }
});

taskRouters.delete("/:id", (req, res) => {
  let tasks = readData();
  tasks = tasks.filter((task) => task.id !== req.params.id);
  writeData(tasks);
  res.status(200).send();
});

taskRouters.delete("/", (req, res) => {
  writeData([]);
  res.status(200).send();
});

module.exports = taskRouters;
