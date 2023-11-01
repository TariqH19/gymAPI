const Exercise = require("../models/exercises.model.js");

const readData = (req, res) => {
  Exercise.find({})
    .then((data) => {
      console.log(data);

      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("None Found");
      }
    })
    .catch((err) => {
      console.log(`Error getting all Exercises ${err}`);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  Exercise.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Exercise ${id} not found` });
      }
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `Exercise ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  console.log(req.body);

  let inputData = req.body;
  if (req.files) {
    const filePaths = req.files.map((file) => file.originalname);
    inputData.file_path = filePaths;
  }

  Exercise.create(inputData)
    .then((data) => {
      console.log(`new Exercise created: ${data}`);
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

  Exercise.findByIdAndUpdate(id, inputData, {
    new: true,
  })
    .then((data) => {
      console.log(`Exercise updated: ${data}`);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(422).json(err);
      } else if (err.name === "CastError") {
        res.status(404).json({ msg: `Exercise ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  Exercise.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Exercise ${id} not found` });
      }
      res.status(200).json({ msg: `Exercise ${id} deleted` });
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `Exercise ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const filterExercisesByUser = (req, res, next) => {
  const userId = req.user._id;
  Exercise.find({ user: userId })
    .then((exercises) => {
      res.json(exercises);
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
  filterExercisesByUser,
};
