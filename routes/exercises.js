const express = require("express");
const router = express.Router();
const imageUpload = require("../configs/images");

const { loggedIn } = require("../commonFunctions/commonFunctions");

const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
  filterByExercise,
} = require("../controllers/exercises.controller");

router
  .get("/", filterByExercise, readData)
  .get("/:id", loggedIn, readOne)
  .post("/", loggedIn, imageUpload.single("image"), createData)
  .put("/:id", loggedIn, imageUpload.single("image"), updateData)
  .delete("/:id", loggedIn, deleteData);

module.exports = router;
