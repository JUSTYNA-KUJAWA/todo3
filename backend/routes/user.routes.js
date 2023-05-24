const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users.controllers");

router.post("/users", UserController.addNewUser);

module.exports = router;
