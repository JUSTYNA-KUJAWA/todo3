const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  datemax: { type: Date, required: true },
  status: { type: Number, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: Number, required: true },
  createdby: { type: Object, required: true },
  users: { type: Array, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
