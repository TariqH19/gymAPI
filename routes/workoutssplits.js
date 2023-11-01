const express = require("express");
const router = express.Router();
const { loginRequired } = require("../controllers/user.controller");
const { isLoggedInGoogle } = require("../passport/passport.js");
const {
  filterByWorkoutSplit,
} = require("../controllers/workoutssplits.controller");

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
} = require("../controllers/workoutssplits.controller");

router
  .get("/", readData)
  .get("/:id", loggedIn, filterByWorkoutSplit, readOne)
  .post("/", loggedIn, filterByWorkoutSplit, createData)
  .put("/:id", loggedIn, filterByWorkoutSplit, updateData)
  .delete("/:id", loggedIn, filterByWorkoutSplit, deleteData);

module.exports = router;
