const Attendance = require('../models/attendance');

module.exports = (app) => {
  app.get('/atendimentos', (req, res) => {
    Attendance.list(res);
  });

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.searchById(id, res);
  });

  app.post('/atendimentos', (req, res) => {
    const attendance = req.body;

    Attendance.add(attendance)
      .then((createdAttendance) => res.status(201).json(createdAttendance))
      .catch((errors) => {
        res.status(400).json(errors);
      });
  });

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Attendance.change(id, values, res);
  });

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Attendance.delete(id, res);
  });
};
