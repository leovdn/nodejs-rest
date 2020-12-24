const connection = require('../infra/connection');

class Pet {
  add(pet, res) {
    const query = 'INSERT INTO pets SET ?';
    connection.query(query, pet, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(200).json(pet);
      }
    });
  }
}

module.exports = new Pet();
