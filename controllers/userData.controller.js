const models = {
  Exercise: require("../models/exercises.model"),
  Workout: require("../models/workouts.model"),
  Splits: require("../models/splits.model"),
  WorkoutExercise: require("../models/workoutsexercises.model"),
  SplitExercise: require("../models/workoutssplits.model"),
};

const getUserData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userData = {};

    for (const modelName in models) {
      if (models.hasOwnProperty(modelName)) {
        const Model = models[modelName];
        userData[modelName.toLowerCase()] = await Model.find({ user: userId });
      }
    }

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserData,
};
