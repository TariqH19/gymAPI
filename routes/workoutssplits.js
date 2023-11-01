const express = require("express");
const router = express.Router();
const { loggedIn } = require("../commonFunctions/commonFunctions");
const {
  filterByWorkoutSplit,
} = require("../controllers/workoutssplits.controller");

const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/workoutssplits.controller");

router
  .get("/", filterByWorkoutSplit, readData)
  .get("/:id", loggedIn, filterByWorkoutSplit, readOne)
  .post("/", loggedIn, createData)
  .put("/:id", loggedIn, updateData)
  .delete("/:id", loggedIn, deleteData);

module.exports = router;
