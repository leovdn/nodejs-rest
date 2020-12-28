const query = require('../infra/database/queries');

class Attendance {
  add(attendance) {
    const sql = 'INSERT INTO attendances SET ?';
    return query(sql, attendance);
  }

  list() {
    const sql = 'SELECT * FROM attendances';

    return query(sql);
  }
}

module.exports = new Attendance();
