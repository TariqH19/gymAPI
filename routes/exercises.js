const express = require("express");
const router = express.Router();
const { loginRequired } = require("../controllers/user.controller");
const { isLoggedInGoogle } = require("../passport/passport.js");
const {
  filterExercisesByUser,
} = require("../controllers/exercises.controller");

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
} = require("../controllers/exercises.controller");

router
  .get("/", filterExercisesByUser, readData)
  .get("/:id", loggedIn, filterExercisesByUser, readOne)
  .post("/", loggedIn, filterExercisesByUser, createData)
  .put("/:id", loggedIn, filterExercisesByUser, updateData)
  .delete("/:id", loggedIn, filterExercisesByUser, deleteData);

module.exports = router;
