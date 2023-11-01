const { loginRequired } = require("../controllers/user.controller");
const { isLoggedInGoogle } = require("../passport/passport.js");

const loggedIn = (req, res, next) => {
  console.log("loginRequired:", loginRequired);
  console.log("isLoggedInGoogle:", isLoggedInGoogle);

  if (loginRequired || isLoggedInGoogle) {
    next();
  } else {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};

module.exports = { loggedIn };
