const express = require("express");
const app = express();
var passport = require("passport");
const session = require("express-session");
const passportStrategy = require("./passport/passport.js");

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
module.exports = app;
