class Tables {
  init(connection) {
    this.connection = connection;

    this.createAppointments();
    this.createPets();
  }

  createAppointments() {
    const sql =
      'CREATE TABLE IF NOT EXISTS attendances (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, date datetime NOT NULL, dateCreated datetime NOT NULL, status varchar(20) NOT NULL, observations text, PRIMARY KEY(id))';

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Tabela attendances criada com sucesso');
      }
    });
  }

  createPets() {
    const query =
      'CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY (id))';

    this.connection.query(query, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Tabela Pets criada com sucesso');
      }
    });
  }
}

module.exports = new Tables();
