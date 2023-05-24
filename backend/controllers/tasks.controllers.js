const Task = require("../models/task.model");
const NODE_ENV = process.env.NODE_ENV;

exports.getAllTasks = async (req, res) => {
  try {
    const result = await Task.find().sort({ created: -1 });
    if (!result) res.status(404).json({ task: "Not found" });
    else res.json(result);
  } catch (err) {
    if (NODE_ENV === "production") console.log("Database error...");
    else res.status(500).json(err);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const result = await Task.findById(req.params.id);
    if (!result) res.status(404).json({ task: "Not found" });
    else res.json(result);
  } catch (err) {
    if (NODE_ENV === "production") console.log("Database error...");
    else res.status(500).json(err);
  }
};

exports.addNewTask = async (req, res) => {
  const {
    category,
    created,
    datemax,
    priority,
    status,
    text,
    title,
    updated,
    createdby,
    users,
  } = req.body;

  try {
    const newTask = new Task({
      category,
      created,
      datemax,
      priority,
      status,
      text,
      title,
      updated,
      createdby,
      users,
    });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    if (NODE_ENV === "production") console.log("Database error...");
    else res.status(500).json(err);
  }
};

exports.editTask = async (req, res) => {
  const {
    category,
    created,
    datemax,
    priority,
    status,
    text,
    title,
    updated,
    createdby,
    users,
  } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.category = category;
      task.created = created;
      task.datemax = datemax;
      task.priority = priority;
      task.status = status;
      task.text = text;
      task.title = title;
      task.updated = updated;
      task.createdby = createdby;
      task.users = users;
      await task.save();
      res.json(await Task.findById(req.params.id));
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    if (NODE_ENV === "production") console.log("Database error...");
    else res.status(500).json(err);
  }
};
