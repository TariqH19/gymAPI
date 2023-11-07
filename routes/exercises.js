const express = require("express");
const router = express.Router();
const imageUpload = require("../configs/images");

const {
  filterExercisesByUser,
} = require("../controllers/exercises.controller");

const { loggedIn } = require("../commonFunctions/commonFunctions");

const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/exercises.controller");

router
  .get("/", filterExercisesByUser, readData)
  .get("/:id", loggedIn, readOne)
  .post("/", loggedIn, imageUpload.single("image"), createData)
  .put("/:id", loggedIn, imageUpload.single("image", 5), updateData)
  .delete("/:id", loggedIn, deleteData);

module.exports = router;
