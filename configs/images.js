const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fileFilter = (req, file, cb) => {
  if (!file) {
    req.imageError = "Please select an image to upload";
    return cb(null, false);
  } else if (!file.originalname.match(/\.(jpg|jpeg|png|mp4)$/)) {
    req.imageError = "Please select a valid image file";
    return cb(null, false);
  } else {
    cb(null, true);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

module.exports = multer({ fileFilter, storage, limits: { files: 5 } });
