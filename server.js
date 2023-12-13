require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = require("./app.js");
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const pathToSwaggerUI = require("swagger-ui-dist").absolutePath();

require("./configs/db.js")();

app.use(express.json());
app.use(cors());
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

app.use("/api/users", require("./routes/users"));
app.use("/api/weights", require("./routes/weights"));
app.use("/api/workoutsexercises", require("./routes/workoutsexercises"));
app.use("/api/exercises", require("./routes/exercises"));
app.use("/api/workouts", require("./routes/workouts"));
app.use("/api/splits", require("./routes/splits"));
app.use("/api/userData", require("./routes/userdata"));

app.listen(port, () => {
  console.log(`listening at port, ${port}`);
});
