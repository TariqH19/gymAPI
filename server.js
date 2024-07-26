require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = require("./app.js");
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");

require("./configs/db.js")();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

app.use(express.static(__dirname + "/public/"));

app.use("/api/cart", require("./routes/cart.js"));
app.use("/api/custom", require("./routes/custom.js"));

app.listen(port, () => {
  console.log(`listening at port, ${port}`);
});
