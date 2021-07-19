module.exports = (app) => {
  const reports = require("./controller.js");

  // Create a new Report
  app.post("/reports", reports.create);

  // Retrieve all Reports
  app.get("/reports", reports.findAll);

  // Retrieve a single Report with reports
  app.get("/reports/:reportId", reports.findOne);

  // Update a Report with reports
  app.put("/reports/:reportId", reports.update);

  // Delete a Report with reports
  app.delete("/reports/:reportId", reports.delete);

  // Create a new Report
  app.delete("/reports", reports.deleteAll);
};
