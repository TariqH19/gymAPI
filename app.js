const express = require("express");
const app = express();

app.get("/app", (req, res) => {
  res.status(200).send("App is running");
});

module.exports = app;
