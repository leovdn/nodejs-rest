const fs = require("fs");

fs.createReadStream("./assets/wolf.jpg")
  .pipe(fs.createWriteStream("./assets/wolf-stream.jpg"))
  .on("finish", () => console.log("wolf escrito com sucesso"));
