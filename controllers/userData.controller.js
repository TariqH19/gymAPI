const Exercise = require("../models/exercises.model");
const Workout = require("../models/workouts.model");
const Splits = require("../models/splits.model");
const WorkoutExercise = require("../models/workoutsexercises.model");
const SplitExercise = require("../models/workoutssplits.model");
const User = require("../models/user.model");

const getUserData = (req, res, next) => {
  const userId = req.user._id;

  Exercise.find({ user: userId })
    .then((userExercises) => {
      return Workout.find({ user: userId }).then((userWorkouts) => {
        return Splits.find({ user: userId }).then((userSplits) => {
          return WorkoutExercise.find({ user: userId }).then(
            (userWorkoutExercises) => {
              return SplitExercise.find({ user: userId }).then(
                (userSplitExercises) => {
                  const userData = {
                    exercises: userExercises,
                    workouts: userWorkouts,
                    splits: userSplits,
                    workoutExercises: userWorkoutExercises,
                    splitExercises: userSplitExercises,
                  };
                  res.json(userData);
                }
              );
            }
          );
        });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  getUserData,
};
