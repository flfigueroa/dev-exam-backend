const Report = require("./models");

// Create and Save a new Report
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Report
  const report = new Report({
    header: req.body.header,
  });

  // Save Report in the database
  Report.create(report, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report.",
      });
    else res.send(data);
  });
};

// Retrieve all Reports from the database.
exports.findAll = (req, res) => {
  Report.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reports.",
      });
    else res.send(data);
  });
};

// Find a single Report with a reportId
exports.findOne = (req, res) => {
  Report.findById(req.params.reportId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Report with id ${req.params.reportId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Report with id " + req.params.reportId,
        });
      }
    } else res.send(data);
  });
};

// Update a Report identified by the reportId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Report.updateById(req.params.reportId, new Report(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Report with id ${req.params.reportId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Report with id " + req.params.reportId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Report with the specified reportId in the request
exports.delete = (req, res) => {
  Report.remove(req.params.reportId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Report with id ${req.params.reportId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Report with id " + req.params.reportId,
        });
      }
    } else res.send({ message: `Report was deleted successfully!` });
  });
};

// Delete all Reports from the database.
exports.deleteAll = (req, res) => {
  Report.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing reports.",
      });
    else res.send({ message: `All Reports were deleted successfully!` });
  });
};
