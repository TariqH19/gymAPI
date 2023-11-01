const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userData.controller");

const { loggedIn } = require("../commonFunctions/commonFunctions");

router.get("/", loggedIn, getUserData);

module.exports = router;
