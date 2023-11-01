const express = require("express");
const router = express.Router();
const { filterBySplit } = require("../controllers/splits.controller");

const { loggedIn } = require("../commonFunctions/commonFunctions");
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/splits.controller");

router
  .get("/", filterBySplit, readData)
  .get("/:id", loggedIn, filterBySplit, readOne)
  .post("/", loggedIn, createData)
  .put("/:id", loggedIn, updateData)
  .delete("/:id", loggedIn, deleteData);

module.exports = router;
