const fs = require('fs');
const path = require('path');

module.exports = (filePath, fileName, callbackCreatedImage) => {
  const extensions = ['jpg', 'png', 'jpeg'];
  const imgExtension = path.extname(filePath);
  const isExtensionsValid =
    extensions.indexOf(imgExtension.substring(1)) !== -1;

  if (isExtensionsValid) {
    const newPath = `./assets/images/${fileName}${imgExtension}`;

    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newPath))
      .on('finish', () => callbackCreatedImage(false, newPath));
  } else {
    const error = 'Tipo inválido';
    console.log('extensão inválida');
    callbackCreatedImage(error);
  }
};
