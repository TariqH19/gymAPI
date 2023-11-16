const app = require("express")();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", require("../routes/users"));

module.exports = app;
