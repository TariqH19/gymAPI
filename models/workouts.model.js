const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the workout is required"],
      unique: true,
    },
    notes: {
      type: [String],
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name of the User is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Workout", workoutSchema);
