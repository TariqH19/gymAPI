require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *      - users
 *     summary: Register user
 *     description: Register user.
 *     requestBody:
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          required: true
 *                          description: The email used for registration.
 *                          example: sam.scott@gmail.com
 *                      name:
 *                          type: string
 *                          required: true
 *                          description: The username used for registration.
 *                          example: sscott123
 *                      password:
 *                          type: string
 *                          required: true
 *                          description: The password used for login.
 *                          example: secret0123
 *                      image:
 *                          type: string
 *                          format: binary
 *                          description: The user's image path.
 *                          example: Diana01.png
 *     responses:
 *       201:
 *         description: Returns the created user data and token.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description: The user objectID.
 *                              example: 653d699d13d7c3d86a91c9ed
 *                          name:
 *                              type: string
 *                              description: The user's username.
 *                              example: Diana01
 *                          email:
 *                              type: string
 *                              description: The user's email address.
 *                              example: Diana01@gmail.com
 *                          image:
 *                              type: string
 *                              description: The user's image path.
 *                              example: Diana01.png
 *                  token:
 *                      type: string
 *                      description: The authentication token.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *              schema:
 *                  properties:
 *                      msg:
 *                          type: string
 *                          description: Error message.
 *                          example: Validation failed
 */

const register = (req, res) => {
  let inputData = new User(req.body);
  if (req.file) {
    inputData.file_path =
      process.env.STORAGE_ENGINE === "S3" ? req.file.key : req.file.filename;
  }
  inputData.password = bcrypt.hashSync(req.body.password, 10);

  // console.log("fileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", req.file.key);

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

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: User login
 *     description: Login an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The user's email address.
 *                 example: sam.scott@gmail.com
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The user's password.
 *                 example: secret0123
 *     responses:
 *       '200':
 *         description: Returns the authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token.
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                   example: User not found
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                   example: Validation failed
 */

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(404).json({
          msg: "user not found",
        });
      }
      // if (user) {
      //   let img = `${process.env.STATIC_FILES_URL}${user.image_path}`;
      //   user.image_path = img;
      //   res.status(200).json(data);
      // }
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

/**
 * @openapi
 * /api/users/profile/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get user profile
 *     description: Get the profile of a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's objectID.
 *         example: 653d699d13d7c3d86a91c9ed
 *     responses:
 *       '200':
 *         description: Returns the user's profile data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The user's objectID.
 *                       example: 653d699d13d7c3d86a91c9ed
 *                     name:
 *                       type: string
 *                       description: The user's username.
 *                       example: Diana01
 *                     email:
 *                       type: string
 *                       description: The user's email address.
 *                       example: Diana01@gmail.com
 *                     image:
 *                       type: string
 *                       description: The user's image path.
 *                       example: Diana01.png
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                   example: User not found
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid request
 */

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
