const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name field is required"],
    },
    email: {
      type: String,
      required: [true, "email field is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password field is required"],
      min: [6, "password must be at least 6 characters long"],
    },
    file_path: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model("User", userSchema);
