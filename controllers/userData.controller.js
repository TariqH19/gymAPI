const Exercise = require("../models/exercises.model");
const Workout = require("../models/workouts.model");
const Splits = require("../models/splits.model");

const getUserData = (req, res, next) => {
  const userId = req.user._id;

  Exercise.find({ user: userId })
    .then((userExercises) => {
      return Workout.find({ user: userId }).then((userWorkouts) => {
        return Splits.find({ user: userId }).then((userSplits) => {
          const userData = {
            exercises: userExercises,
            workouts: userWorkouts,
            splits: userSplits,
          };
          res.json(userData);
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
