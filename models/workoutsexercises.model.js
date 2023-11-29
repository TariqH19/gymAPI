const { Schema, model } = require("mongoose");

const workoutExerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the Session is required"],
    },
    setDetails: [
      {
        exercise: {
          type: [Schema.Types.ObjectId],
          required: true,
          ref: "Exercise",
        },
        setNumber: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
        },
      },
    ],
    workoutDetails: [
      {
        workout: {
          type: [Schema.Types.ObjectId],
          required: true,
          ref: "Workout",
        },
        time_start: {
          type: Date,
        },
        time_end: {
          type: Date,
        },
        notes: {
          type: [String],
        },
      },
    ],
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
