const { Schema, model } = require("mongoose");

const WeightsSchema = new Schema(
  {
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      unique: false,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      unique: false,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name of the User is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Weight", WeightsSchema);
