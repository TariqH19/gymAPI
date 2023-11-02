const express = require("express");
const router = express.Router();
const { filterByWorkout } = require("../controllers/workouts.controller");
const { loggedIn } = require("../commonFunctions/commonFunctions");
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/workouts.controller");

router
  .get("/", filterByWorkout, readData)
  .get("/:id", loggedIn, readOne)
  .post("/", loggedIn, createData)
  .put("/:id", loggedIn, updateData)
  .delete("/:id", loggedIn, deleteData);

module.exports = router;
