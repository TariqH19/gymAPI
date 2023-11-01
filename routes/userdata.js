const express = require("express");
const router = express.Router();
const { loginRequired } = require("../controllers/user.controller");
const { isLoggedInGoogle } = require("../passport/passport.js");
const { getUserData } = require("../controllers/userData.controller");

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

router.get("/", loggedIn, getUserData);

module.exports = router;
