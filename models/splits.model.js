const { Schema, model } = require("mongoose");

const splitsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the split is required"],
      unique: false,
    },
    workout: {
      type: [Schema.Types.ObjectId],
      required: [true, "Name of the workout is required"],
      ref: "Workout",
    },
    notes: {
      type: String,
    },
    dateStart: {
      type: Date,
    },
    dateEnd: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name of the User is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Splits", splitsSchema);
