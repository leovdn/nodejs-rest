const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, callbackCreatedImage) => {
  const acceptedExtensions = ['jpg', 'png', 'jpeg'];
  const imgExtension = path.extname(filePath);
  const isAcceptedExtensiosValid = acceptedExtensions.indexOf(
    imgExtension.substring(1)
  );

  if (isAcceptedExtensiosValid === -1) {
    console.log('extensão inválida');
  } else {
    const newPath = `./assets/images/${fileName}${imgExtension}`;

    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newPath))
      .on('finish', () => callbackCreatedImage(newPath));
  }
};
