const express = require("express");
const router = express.Router();
const { loggedIn } = require("../commonFunctions/commonFunctions");
const { filterByWeights } = require("../controllers/weights.controller");

const {
  readData,
  createData,
  updateData,
  deleteData,
} = require("../controllers/weights.controller");

router
  .get("/", filterByWeights, readData)
  .post("/", loggedIn, createData)
  .put("/:id", loggedIn, updateData)
  .delete("/:id", loggedIn, deleteData);

module.exports = router;
