const express = require("express");
const router = express.Router();

const { readData, createData } = require("../controllers/custom.controller");

router.get("/", filterByWorkout, readData).post("/", loggedIn, createData);

module.exports = router;
