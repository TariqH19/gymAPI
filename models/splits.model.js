const { Schema, model } = require("mongoose");

const splitsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the splits is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name of the splits is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Splits", splitsSchema);
