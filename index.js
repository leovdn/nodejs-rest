const customExpress = require('./config/customExpress');
const connection = require('./infra/database/connection');
const Tables = require('./infra/database/Tables');

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('DataBase Connected successfully!');

    Tables.init(connection);
    const app = customExpress();

    app.listen(3333, () => {
      console.log('server running on port 3333!');
    });
  }
});
