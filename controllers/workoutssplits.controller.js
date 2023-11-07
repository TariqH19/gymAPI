const WorkoutSplit = require("../models/workoutssplits.model.js");

const readData = (req, res) => {
  WorkoutSplit.find({})
    .then((data) => {
      console.log(data);

      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("None Found");
      }
    })
    .catch((err) => {
      console.log(`Error getting all WorkoutSplits ${err}`);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  WorkoutSplit.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `WorkoutSplit ${id} not found` });
      }
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `WorkoutSplit ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  console.log(req.body);

  let inputData = req.body;

  WorkoutSplit.create(inputData)
    .then((data) => {
      console.log(`new WorkoutSplit created`);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(422).json(err);
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const updateData = (req, res) => {
  let id = req.params.id;
  let inputData = req.body;

  WorkoutSplit.findByIdAndUpdate(id, inputData, {
    new: true,
  })
    .then((data) => {
      console.log(`WorkoutSplit updated`);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(422).json(err);
      } else if (err.name === "CastError") {
        res.status(404).json({ msg: `WorkoutSplit ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  WorkoutSplit.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `WorkoutSplit ${id} not found` });
      }
      res.status(200).json({ msg: `WorkoutSplit ${id} deleted` });
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `WorkoutSplit ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const filterByWorkoutSplit = (req, res, next) => {
  const userId = req.user._id;
  WorkoutSplit.find({ user: userId })
    .then((workoutsplits) => {
      res.json(workoutsplits);
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
  filterByWorkoutSplit,
};
