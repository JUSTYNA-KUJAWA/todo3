const Task = require("../models/task.model");
const NODE_ENV = process.env.NODE_ENV;

exports.getAllTasks = async (req, res) => {
  try {
    const result = await Task.find().sort({ created: -1 });
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    if (NODE_ENV === "production") console.log("Database error...");
    else res.status(500).json(err);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    if (NODE_ENV === "production") console.log("Database error...");
    else res.status(500).json(err);
  }
};

exports.addNewTask = async (req, res) => {
  const {
    mail,
    created,
    updated,
    status,
    title,
    text,
    category,
    priority,
    nickname,
  } = req.body;

  try {
    const newTask = new Task({
      mail,
      created,
      updated,
      status,
      title,
      text,
      category,
      priority,
      nickname,
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
    mail,
    created,
    updated,
    status,
    title,
    text,
    category,
    priority,
    nickname,
  } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.mail = mail;
      task.created = created;
      task.updated = updated;
      task.status = status;
      task.title = title;
      task.text = text;
      task.category = category;
      task.mail = mail;
      task.nickname = nickname;
      task.priority = priority;
      await task.save();
      res.json(await Task.findById(req.params.id));
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    if (NODE_ENV === "production") console.log("Database error...");
    else res.status(500).json(err);
  }
};
