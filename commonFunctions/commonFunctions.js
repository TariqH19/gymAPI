require("dotenv").config();
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

const deleteImage = (file_path) => {
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

const deletedImage = async (filename) => {
  if (process.env.STORAGE_ENGINE === "S3") {
    const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
    const s3 = new S3Client({
      region: process.env.MY_AWS_REGION,
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
      },
    });

    try {
      const data = await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.MY_AWS_BUCKET,
          Key: filename,
        })
      );
      console.log("Success. Object deleted.", data);
    } catch (err) {
      console.error(err);
    }
  } else {
    let path = `public/uploads/${filename}`;

    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log(`${filename} was deleted!`);
      });
    });
  }
};

module.exports = { loggedIn, deletedImage };
