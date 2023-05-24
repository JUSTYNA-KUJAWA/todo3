const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  created: { type: Date, required: true },
  updated: { type: Date },
  status: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  category: { type: String },
  priority: { type: String },
  nickname: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
