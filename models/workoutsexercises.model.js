const { Schema, model } = require("mongoose");

const workoutExerciseSchema = new Schema(
  {
    workout: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Workout",
    },
    exercise: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Exercise",
    },
    setDetails: [
      {
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
        exercise: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Exercise",
        },
      },
    ],
    workoutDetails: [
      {
        time_start: {
          type: Date,
        },
        time_end: {
          type: Date,
        },
        notes: {
          type: [String],
        },
        workout: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Workout",
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name of the User is required"],
    },
    file_path: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = model("WorkoutExercise", workoutExerciseSchema);
