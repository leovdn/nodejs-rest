const query = require('../infra/database/queries');

class Attendance {
  add(attendance) {
    const sql = 'INSERT INTO attendances SET ?';
    return query(sql, attendance);
  }
}

module.exports = new Attendance();
