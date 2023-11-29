const { Schema, model } = require("mongoose");

const workoutExerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the Session is required"],
    },

    exercise: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Exercise",
    },

    workout: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Workout",
    },

    notes: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name of the User is required"],
    },
    file_path: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("WorkoutExercise", workoutExerciseSchema);
