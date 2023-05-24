/* eslint-disable linebreak-style */
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("./config/passport");
require("dotenv").config();

const tasksRoutes = require("./routes/task.routes");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use("/api", tasksRoutes);

/* API ERROR PAGES */
app.use("/api", (req, res) => {
  res.status(404).send({ post: "Not found..." });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, "../build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = "";

if (NODE_ENV === "production") dbUri = `mongodb+srv://JUSTI:`;
else dbUri = "mongodb://localhost:27017/";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

//
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to the database");
});
db.on("error", (err) => console.log("Error: " + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
