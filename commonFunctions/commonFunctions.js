const { loginRequired } = require("../controllers/user.controller");
const { isLoggedInGoogle } = require("../passport/passport.js");
const fs = require("fs");

const loggedIn = (req, res, next) => {
  if (loginRequired || isLoggedInGoogle) {
    next();
  } else {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};

const deletedImage = (file_path) => {
  let path = `./public/uploads/${file_path}`;
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${path} does not exist`);
      return;
    }

    fs.unlink(path, (err) => {
      if (err) {
        console.log(`Error deleting file ${path}`);
        return;
      }
      console.log(`File ${path} deleted`);
    });
  });
};

module.exports = { loggedIn, deletedImage };
