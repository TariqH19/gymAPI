const express = require("express");
const router = express.Router();
const {
  getUserData,
  getExerciseData,
} = require("../controllers/userData.controller");

const { loggedIn } = require("../commonFunctions/commonFunctions");

router.get("/", loggedIn, getUserData);
router.get("/data", getExerciseData);

module.exports = router;
