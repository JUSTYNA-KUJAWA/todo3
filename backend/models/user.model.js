const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  mail: {
    type: String,
    required: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
});

module.exports = mongoose.model("User", userSchema);
