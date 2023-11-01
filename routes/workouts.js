const express = require("express");
const router = express.Router();
const { loginRequired } = require("../controllers/user.controller");
const { filterByWorkout } = require("../controllers/workouts.controller");
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/workouts.controller");

router
  .get("/", readData)
  .get("/:id", loginRequired, filterByWorkout, readOne)
  .post("/", loginRequired, filterByWorkout, createData)
  .put("/:id", loginRequired, filterByWorkout, updateData)
  .delete("/:id", loginRequired, filterByWorkout, deleteData);

module.exports = router;
