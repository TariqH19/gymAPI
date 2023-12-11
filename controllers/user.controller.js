require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  let inputData = new User(req.body);
  if (req.file) {
    inputData.image_path =
      process.env.STORAGE_ENGINE === "S3" ? req.file.key : req.file.filename;
  }
  inputData.password = bcrypt.hashSync(req.body.password, 10);

  inputData
    .save()
    .then((user) => {
      let token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          _id: user._id,
          file_path: user.file_path,
        },
        process.env.JWT_SECRET
      );
      user.password = undefined;
      return res.status(201).json({
        data: user,
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: err,
      });
    });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(404).json({
          msg: "user not found",
        });
      }
      if (user) {
        let img = `${process.env.STATIC_FILES_URL}${user.image_path}`;
        user.image_path = img;
        res.status(200).json(data);
      }
      let token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          _id: user._id,
          file_path: user.file_path,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: err,
      });
    });
};

const loginRequired = (req, res, next) => {
  if (req.user) {
    // User is authenticated, continue to the next middleware or route
    next();
  } else {
    // User is not authenticated, send a 401 Unauthorized response
    res.status(401).json({
      msg: "Unauthorized",
    });
  }
};

const profile = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({
          msg: "User not found",
        });
      }

      user.password = undefined;
      res.status(200).json({
        data: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        msg: err,
      });
    });
};

const logout = (req, res) => {};

module.exports = {
  register,
  login,
  profile,
  logout,
  loginRequired,
};
