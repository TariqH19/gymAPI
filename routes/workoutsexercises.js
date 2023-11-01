const express = require("express");
const router = express.Router();
const imageUpload = require("../configs/images");

const {
  filterByWorkoutExercise,
} = require("../controllers/workoutsexercises.controller");

const { loggedIn } = require("../commonFunctions/commonFunctions");
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/workoutsexercises.controller");

router
  .get("/", readData)
  .get("/:id", loggedIn, filterByWorkoutExercise, readOne)
  .post("/", loggedIn, imageUpload.array("files", 5), createData)
  .put("/:id", loggedIn, imageUpload.array("files", 5), updateData)
  .delete("/:id", loggedIn, deleteData);

module.exports = router;
