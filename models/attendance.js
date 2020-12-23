const moment = require("moment");
const connection = require("../infra/connection");

class Attendance {
  add(attendance) {
    const dateCreated = moment().format("YYYY-MM-DD HH:MM:SS");
    const date = moment(attendance.date, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    const createdAttendance = { ...attendance, dateCreated, date };

    const sql = "INSERT INTO attendances SET ?";

    connection.query(sql, createdAttendance, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
      }
    });
  }
}

module.exports = new Attendance();
