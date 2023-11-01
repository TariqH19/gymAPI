const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the exercise is required"],
      unique: true,
    },
    muscle_group: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name of the user is required"],
    },
    file_path: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = model("Exercise", exerciseSchema);
