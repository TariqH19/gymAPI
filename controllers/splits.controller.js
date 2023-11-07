const Splits = require("../models/splits.model.js");

const readData = (req, res) => {
  Splits.find({})
    .then((data) => {
      console.log(data);

      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("None Found");
      }
    })
    .catch((err) => {
      console.log(`Error getting all Splitss ${err}`);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  Splits.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Splits ${id} not found` });
      }
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `Splits ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  console.log(req.body);

  let inputData = req.body;

  Splits.create(inputData)
    .then((data) => {
      console.log(`new Splits created`);
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

  Splits.findByIdAndUpdate(id, inputData, {
    new: true,
  })
    .then((data) => {
      console.log(`Splits updated`);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(422).json(err);
      } else if (err.name === "CastError") {
        res.status(404).json({ msg: `Splits ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  Splits.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ msg: `Splits ${id} not found` });
      }
      res.status(200).json({ msg: `Splits ${id} deleted` });
      console.log(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).json({ msg: `Splits ${id} not found` });
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    });
};

const filterBySplit = (req, res, next) => {
  const userId = req.user._id;
  Splits.find({ user: userId })
    .then((splits) => {
      res.json(splits);
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
  filterBySplit,
};
