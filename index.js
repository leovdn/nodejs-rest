const customExpress = require("./config/customExpress");

const app = customExpress();

app.listen(3333, () => {
  console.log("server running on port 3333!");
});