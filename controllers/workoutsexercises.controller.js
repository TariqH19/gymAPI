const WorkoutExercise = require("../models/workoutsexercises.model.js");

const readData = (req, res) => {
  WorkoutExercise.find({})
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "No records found" });
      }
    })
    .catch((err) => {
      console.error(`Error getting all WorkoutExercises: ${err}`);
      res.status(500).json({ message: "Internal server error" });
    });
};

const readOne = (req, res) => {
  const id = req.params.id;

  WorkoutExercise.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `WorkoutExercise ${id} not found` });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ message: `WorkoutExercise ${id} not found` });
      } else {
        console.error(`Error finding WorkoutExercise ${id}: ${err}`);
        res.status(500).json({ message: "Internal server error" });
      }
    });
};

const createData = (req, res) => {
  const inputData = req.body;

  WorkoutExercise.create(inputData)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(422)
          .json({ message: "Validation error", errors: err.errors });
      } else {
        console.error(`Error creating WorkoutExercise: ${err}`);
        res.status(500).json({ message: "Internal server error" });
      }
    });
};

const updateData = (req, res) => {
  const id = req.params.id;
  const inputData = req.body;

  WorkoutExercise.findByIdAndUpdate(id, inputData, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `WorkoutExercise ${id} not found` });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(422)
          .json({ message: "Validation error", errors: err.errors });
      } else if (err.name === "CastError") {
        res.status(404).json({ message: `WorkoutExercise ${id} not found` });
      } else {
        console.error(`Error updating WorkoutExercise ${id}: ${err}`);
        res.status(500).json({ message: "Internal server error" });
      }
    });
};

const deleteData = (req, res) => {
  const id = req.params.id;

  WorkoutExercise.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `WorkoutExercise ${id} not found` });
      } else {
        res.status(200).json({ message: `WorkoutExercise ${id} deleted` });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ message: `WorkoutExercise ${id} not found` });
      } else {
        console.error(`Error deleting WorkoutExercise ${id}: ${err}`);
        res.status(500).json({ message: "Internal server error" });
      }
    });
};

const filterByWorkoutExercise = (req, res, next) => {
  const userId = req.user._id;
  WorkoutExercise.find({ user: userId })
    .then((workoutsexercises) => {
      res.json(workoutsexercises);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
  filterByWorkoutExercise,
};
