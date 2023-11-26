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
  console.log(req.headers);
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ");
  }
  console.log(token);
  if (token && token[0] === "Bearer") {
    // Verify token is valid
    jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification error:", err);
      } else {
        req.user = decoded;
      }
      next();
    });
  } else {
    console.log("No token");
    next();
  }
});

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/workoutssplits", require("./routes/workoutssplits"));
app.use("/api/workoutsexercises", require("./routes/workoutsexercises"));
app.use("/api/exercises", require("./routes/exercises"));
app.use("/api/workouts", require("./routes/workouts"));
app.use("/api/splits", require("./routes/splits"));
app.use("/api/userData", require("./routes/userdata"));

app.listen(port, () => {
  console.log(`listening at port, ${port}`);
});
