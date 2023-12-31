const WorkoutExercise = require("../models/workoutsexercises.model.js");
const { deletedImage } = require("../commonFunctions/commonFunctions.js");

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
  let inputData = req.body;
  if (req.file) {
    inputData.file_path = req.file.filename;
  }

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
  let id = req.params.id;
  let inputData = req.body;
  if (req.file) {
    inputData.file_path = req.file.filename;
  }

  WorkoutExercise.findByIdAndUpdate(id, inputData, {
    new: false,
  })
    .then((data) => {
      console.log(`WorkoutExercise updated`);
      if (data) {
        if (req.file && data.file_path) {
          deletedImage(data.file_path);
        }
        res.status(201).json(data);
      } else {
        //deletedImage(inputData.file_path);
        res.status(404).json({ msg: `WorkoutExercise ${id} not found` });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(422).json(err);
        console.log(err);
      } else if (err.name === "CastError") {
        res.status(404).json({ msg: `WorkoutExercise ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  const id = req.params.id;
  let file_path = "";

  WorkoutExercise.findById(id)
    .then((data) => {
      if (data) {
        file_path = data.file_path;
        return data.deleteOne();
      } else {
        res.status(404).json({ msg: `WorkoutExercise ${id} not found` });
      }
    })
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `WorkoutExercise ${id} not found` });
      }
      deletedImage(data.file_path);
      res.status(200).json({ msg: `WorkoutExercise ${id} deleted` });
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `WorkoutExercise ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
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
