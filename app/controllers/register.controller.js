const Register = require("../models/register.model.js");

exports.create = (req, res) => {
  if (!req.body.fullName) {
    return res.status(400).send({
      message: "Full name cannot be empty"
    });
  }

  const register = new Register({
    id: req.body.id,
    fullName: req.body.fullName,
    email: req.body.email,
    dateOfBrith: req.body.dateOfBrith,
    favoriteFiveInegers: req.body.favoriteFiveInegers,
    emailOptIn: req.body.emailOptIn,
    timeOfRegisteration: req.body.timeOfRegisteration
  });

  register
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating Register"
      });
    });
};

exports.findAll = (req, res) => {
  Register.find()
    .then(register => {
    res.send(register);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while retrieving"
      });
    });
};

exports.findOne = (req, res) => {
  Register.findById(req.params.registerId)
    .then(register => {
      if (!register) {
        return res.status(404).send({
          message: "Registrant not found with id " + req.params.registerId
        });
      }
      res.send(register);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Registrant not found with id" + req.params.registerId
        });
      }
      return res.status(500).send({
        message: "Error retrieving registrant with id " + req.params.registerId
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.fullName) {
    return res.status(400).send({
      message: "Full name cannot be empty"
    });
  }

  Register.findByIdAndUpdate(
    req.params.registerId,
    {
      fullName: req.body.fullName,
      email: req.body.email,
      dateOfBrith: req.body.dateOfBrith,
      favoriteFiveInegers: req.body.favoriteFiveInegers,
      emailOptIn: req.body.emailOptIn,
      timeOfRegisteration: req.body.timeOfRegisteration
    },
    { new: true }
  )
    .then(register => {
      if (!register) {
        return res.status(404).send({
          message: "Registrant not found with id " + req.params.registerId
        });
      }
      res.send(register);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Registrant not found with id " + req.params.registerId
        });
      }
      return res.status(500).send({
        message: "Error updating registrant with id " + req.params.registerId
      });
    });
};

exports.delete = (req, res) => {
  Register.findByIdAndRemove(req.params.registerId)
    .then(register => {
      if (!register) {
        return res.status(400).send({
          message: "Registrant not found with id " + req.params.registerId
        });
      }
      res.send({ message: "Registrant deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.registerId === "NotFound") {
        return res.status(404).send({
          message: "Registrant not found with id " + req.params.registerId
        });
      }
      return res.status(500).send({
        message: "Count not delete with id" + req.params.registerId
      });
    });
};
