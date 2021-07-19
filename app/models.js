const sql = require("./db.js");

// constructor
const Report = function (report) {
  this.header = report.header;
};

Report.create = (newReport, result) => {
  sql.query("INSERT INTO reports SET ?", newReport, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created report: ", { id: res.insertId, ...newReport });
    result(null, { id: res.insertId, ...newReport });
  });
};

Report.findById = (reportId, result) => {
  sql.query(`SELECT * FROM reports WHERE id = ${reportId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found report: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Report with the id
    result({ kind: "not_found" }, null);
  });
};

Report.getAll = (result) => {
  sql.query("SELECT * FROM reports", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reports: ", res);
    result(null, res);
  });
};

Report.updateById = (id, report, result) => {
  sql.query(
    "UPDATE reports SET header = ? WHERE id = ?",
    [report.header],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Report with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated report: ", { id: id, ...report });
      result(null, { id: id, ...report });
    }
  );
};

Report.remove = (id, result) => {
  sql.query("DELETE FROM reports WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Report with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted report with id: ", id);
    result(null, res);
  });
};

Report.removeAll = (result) => {
  sql.query("DELETE FROM reports", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} reports`);
    result(null, res);
  });
};

module.exports = Report;
