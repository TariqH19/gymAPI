require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = require("./app.js");
const port = 3000;
var passport = require("passport");
const session = require("express-session");
const passportStrategy = require("./passport/passport.js");
const morgan = require("morgan");

require("./configs/db.js")();

app.use(express.json());

app.use(morgan("dev"));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/success", (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
///////////////////////////////////////////////////////////////////////////////////////////////////
///// GOGGLE AUTHENTICATION /////////////////////////////////////////////////////////////////////

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
        //req.user = undefined;
      } else {
        req.user = decoded;
      }
      next();
    });
  } else {
    console.log("No token");
    // req.user = undefined;
    next();
  }
});

app.use((req, res, next) => {
  console.log(req.user);
  next();
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
