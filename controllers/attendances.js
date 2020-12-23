const Attendance = require("../models/attendance");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Attendance.list(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.searchById(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    const attendance = req.body;

    Attendance.add(attendance, res);
  });
};
