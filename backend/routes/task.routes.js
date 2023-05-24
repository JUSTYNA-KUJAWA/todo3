const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/tasks.controllers");

router.get("/tasks", TaskController.getAllTasks);
router.get("/tasks/:id", TaskController.getTaskById);

module.exports = router;
