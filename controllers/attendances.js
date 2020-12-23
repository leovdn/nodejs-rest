const Attendance = require("../models/attendance");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    res.send("Rota de Atendimentos - GET");
  });

  app.post("/atendimentos", (req, res) => {
    const attendance = req.body;

    Attendance.add(attendance);

    res.send("Você está na rota de atendimentos e está realizando um POST");
  });
};
