const { Schema, model } = require("mongoose");

const workoutSplitSchema = new Schema(
  {
    workout: {
      type: Schema.Types.ObjectId,
      required: [true, "Name of the workout is required"],
      ref: "Workout",
    },
    split: {
      type: Schema.Types.ObjectId,
      required: [true, "Name of the split is required"],
      ref: "Split",
    },
    notes: {
      type: [String],
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

module.exports = model("WorkoutSplit", workoutSplitSchema);
