require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const cors = require("cors");

require("../configs/db.js")();

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_ATLAS_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  if (req.path === "/favicon.ico") {
    // Skip token verification for favicon requests
    return next();
  }
  console.log(req.headers);
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ");
  }
  if (!token && req.query._vercel_jwt) {
    token = ["Bearer", req.query._vercel_jwt];
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

app.use("/api/users", require("../routes/users"));
app.use("/api/workoutssplits", require("../routes/workoutssplits"));
app.use("/api/workoutsexercises", require("../routes/workoutsexercises"));
app.use("/api/exercises", require("../routes/exercises"));
app.use("/api/workouts", require("../routes/workouts"));
app.use("/api/splits", require("../routes/splits"));
app.use("/api/userData", require("../routes/userdata"));

app.get("/auth", (req, res) => {
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

app.listen(port, () => {
  console.log(`listening at port, ${port}`);
});

module.exports = app;
