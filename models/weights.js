const { Schema, model } = require("mongoose");

const workoutSplitSchema = new Schema(
  {
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      unique: false,
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
