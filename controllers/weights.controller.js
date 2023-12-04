const Weights = require("../models/weights.model.js");

const readData = (req, res) => {
  Weights.find({})
    .then((data) => {
      console.log(data);

      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("None Found");
      }
    })
    .catch((err) => {
      console.log(`Error getting all Weights ${err}`);
      res.status(500).json(err);
    });
};

const createData = (req, res) => {
  console.log(req.body);

  let inputData = req.body;

  Weights.create(inputData)
    .then((data) => {
      console.log(`new Weights created`);
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

  Weights.findByIdAndUpdate(id, inputData, {
    new: true,
  })
    .then((data) => {
      console.log(`Weights updated`);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(422).json(err);
      } else if (err.name === "CastError") {
        res.status(404).json({ msg: `Weights ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  Weights.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Weights ${id} not found` });
      }
      res.status(200).json({ msg: `Weights ${id} deleted` });
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `Weights ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const filterByWeights = (req, res, next) => {
  const userId = req.user._id;
  Weights.find({ user: userId })
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
  filterByWeights,
};
