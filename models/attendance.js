const connection = require("../infra/connection");

class Attendance {
  add(attendance) {
    const sql = "INSERT INTO attendances SET ?";

    connection.query(sql, attendance, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
      }
    });
  }
}

module.exports = new Attendance();
