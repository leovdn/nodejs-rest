const connection = require('../infra/connection');
const fileUpload = require('../files/fileUpload');

class Pet {
  add(pet, res) {
    const query = 'INSERT INTO pets SET ?';

    fileUpload(pet.image, pet.name, (newPath) => {
      const newPet = { name: pet.name, image: newPath };

      connection.query(query, newPet, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json(error);
        } else {
          res.status(200).json(newPet);
        }
      });
    });
  }
}

module.exports = new Pet();
