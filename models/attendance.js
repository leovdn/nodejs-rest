const { default: axios } = require('axios');
const moment = require('moment');
const connection = require('../infra/database/connection');
const repository = require('../repositories/attendances');

class Attendance {
  constructor() {
    this.isDateValid = ({ date, dateCreated }) =>
      moment(date).isSameOrAfter(dateCreated);

    this.isClientValid = (length) => length >= 5;

    this.validate = (params) => {
      this.validations.filter((field) => {
        const { name } = field;
        const param = params[name];

        return !field.valid(param);
      });
    };

    this.validations = [
      {
        name: 'date',
        valid: this.isDateValid,
        message: 'Data deve ser maior ou igual a data atual',
      },
      {
        name: 'client',
        valid: this.isClientValid,
        message: 'Cliente deve ter pelo menos 5 caracteres',
      },
    ];
  }

  add(attendance) {
    const dateCreated = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(attendance.date, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:MM:SS'
    );

    const params = {
      date: { date, dateCreated },
      client: { length: attendance.client.length },
    };

    const errors = this.validate(params);
    const isThereErrors = errors.length;

    if (isThereErrors) {
      return new Promise((resolve, reject) => {
        reject(errors);
      });
    } else {
      const createdAttendance = { ...attendance, dateCreated, date };

      return repository.add(createdAttendance).then((results) => {
        const id = results.insertId;
        return { ...attendance, id };
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
