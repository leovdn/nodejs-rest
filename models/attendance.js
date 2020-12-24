const { default: axios } = require('axios');
const moment = require('moment');
const connection = require('../infra/connection');

class Attendance {
  add(attendance, res) {
    const dateCreated = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(attendance.date, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:MM:SS'
    );
    const isDateValid = moment(date).isSameOrAfter(dateCreated);
    const isClientValid = attendance.client.length >= 5;

    const validations = [
      {
        name: 'date',
        valid: isDateValid,
        message: 'Data deve ser maior ou igual a data atual',
      },
      {
        name: 'cliennt',
        valid: isClientValid,
        message: 'Cliente deve ter pelo menos 5 caracteres',
      },
    ];

    const errors = validations.filter((field) => !field.valid);
    const isThereErrors = errors.length;

    if (isThereErrors) {
      res.status(400).json(errors);
    } else {
      const createdAttendance = { ...attendance, dateCreated, date };

      const sql = 'INSERT INTO attendances SET ?';

      connection.query(sql, createdAttendance, (error, results) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(attendance);
        }
      });
    }
  }

  list(res) {
    const sql = 'SELECT * FROM attendances';

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  searchById(id, res) {
    const sql = `SELECT * FROM attendances WHERE id=${id}`;

    connection.query(sql, async (error, results) => {
      const attendance = results[0];
      const cpf = attendance.client;

      if (error) {
        res.status(400).json(error);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);

        attendance.client = data;

        res.status(200).json(attendance);
      }
    });
  }

  change(id, values, res) {
    if (values.date) {
      values.date = moment(values.date, 'DD/MM/YYYY').format(
        'YYYY-MM-DD HH:MM:SS'
      );
    }

    const sql = 'UPDATE attendances SET ? WHERE id=?';

    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...values, id });
      }
    });
  }

  delete(id, res) {
    const sql = 'DELETE FROM attendances WHERE id=?';

    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Attendance();
