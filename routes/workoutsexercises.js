const express = require("express");
const router = express.Router();
const { loginRequired } = require("../controllers/user.controller");
const { isLoggedInGoogle } = require("../passport/passport.js");
const {
  filterByWorkoutExercise,
} = require("../controllers/workoutsexercises.controller");

const loggedIn = (req, res, next) => {
  console.log("loginRequired:", loginRequired);
  console.log("isLoggedInGoogle:", isLoggedInGoogle);

  if (loginRequired || isLoggedInGoogle) {
    next();
  } else {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};
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
  .post("/", loggedIn, filterByWorkoutExercise, createData)
  .put("/:id", loggedIn, filterByWorkoutExercise, updateData)
  .delete("/:id", loggedIn, filterByWorkoutExercise, deleteData);

module.exports = router;
