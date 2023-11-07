const Workout = require("../models/workouts.model.js");

const readData = (req, res) => {
  Workout.find({})
    .then((data) => {
      console.log(data);

      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("None Found");
      }
    })
    .catch((err) => {
      console.log(`Error getting all Workouts ${err}`);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  Workout.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Workout ${id} not found` });
      }
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `Workout ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  console.log(req.body);

  let inputData = req.body;

  Workout.create(inputData)
    .then((data) => {
      console.log(`new Workout created`);
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

  Workout.findByIdAndUpdate(id, inputData, {
    new: true,
  })
    .then((data) => {
      console.log(`Workout updated`);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(422).json(err);
      } else if (err.name === "CastError") {
        res.status(404).json({ msg: `Workout ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  Workout.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Workout ${id} not found` });
      }
      res.status(200).json({ msg: `Workout ${id} deleted` });
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `Workout ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const filterByWorkout = (req, res, next) => {
  const userId = req.user._id;
  Workout.find({ user: userId })
    .then((workouts) => {
      res.json(workouts);
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
  filterByWorkout,
};
