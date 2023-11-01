// all user routes go in here
const express = require("express");
const router = express.Router();
const imageUpload = require("../configs/images");

const {
  register,
  login,
  logout,
  profile,
  loginRequired,
} = require("../controllers/user.controller");

router
  .post("/register", imageUpload.single("image"), register)
  .post("/login", login)
  .post("/logout", logout)
  .get("/profile/:id", loginRequired, profile);

module.exports = router;
