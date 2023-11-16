const app = require("express")();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/register", require("../routes/users"));

module.exports = app;
