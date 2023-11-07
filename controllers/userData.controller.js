const Exercise = require("../models/exercises.model");
const Workout = require("../models/workouts.model");
const Splits = require("../models/splits.model");
const WorkoutExercise = require("../models/workoutsexercises.model");
const SplitExercise = require("../models/workoutssplits.model");

const getUserData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [
      userExercises,
      userWorkouts,
      userSplits,
      userWorkoutExercises,
      userSplitExercises,
    ] = await Promise.all([
      Exercise.find({ user: userId }),
      Workout.find({ user: userId }),
      Splits.find({ user: userId }),
      WorkoutExercise.find({ user: userId }),
      SplitExercise.find({ user: userId }),
    ]);

    const userData = {
      exercises: userExercises,
      workouts: userWorkouts,
      splits: userSplits,
      workoutExercises: userWorkoutExercises,
      splitExercises: userSplitExercises,
    };

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserData,
};
