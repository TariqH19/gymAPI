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
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const pathToSwaggerUI = require("swagger-ui-dist").absolutePath();

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

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gym API",
      version: "1.0.0",
    },
  },
  apis: ["./controllers/*.controller.js"],
};

// serve swagger doc
const swaggerSpec = swaggerJsDoc(options);
app.use("/", swaggerUi.serve);
app.get(
  "/",
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
    customSiteTitle: "AJ CA1",
  })
);

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

app.use("./public", express.static(__dirname + "/public/"));

app.use("/api/users", require("../routes/users"));
app.use("/api/weights", require("../routes/weights"));
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
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    // Authentication succeeded; create a JWT token
    const user = req.user;
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    // Redirect the user to the frontend with the token as a query parameter
    res.redirect(`http://localhost:3000/?token=${token}`);
  }
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
