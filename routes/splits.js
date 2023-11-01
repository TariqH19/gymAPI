const express = require("express");
const router = express.Router();
const { loginRequired } = require("../controllers/user.controller");
const { isLoggedInGoogle } = require("../passport/passport.js");
const { filterBySplit } = require("../controllers/splits.controller");

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
} = require("../controllers/splits.controller");

router
  .get("/", readData)
  .get("/:id", loggedIn, filterBySplit, readOne)
  .post("/", loggedIn, filterBySplit, createData)
  .put("/:id", loggedIn, filterBySplit, updateData)
  .delete("/:id", loggedIn, filterBySplit, deleteData);

module.exports = router;
