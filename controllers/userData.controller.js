require("dotenv").config();
const axios = require("axios");

let muscle = "chest";

const getExerciseData = (req, res, next) => {
  axios({
    method: "GET",
    url: `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
    headers: { "X-Api-Key": process.env.EX_API_KEY },
    contentType: "application/json",
  })
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
};

const models = {
  Exercise: require("../models/exercises.model"),
  Workout: require("../models/workouts.model"),
  Splits: require("../models/splits.model"),
  WorkoutExercise: require("../models/workoutsexercises.model"),
  Weight: require("../models/weights.model"),
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
  getExerciseData,
};
