const { sequelize } = require("./sequelize");
const controllers = require("./controllers");
const express = require("express");
const bodyParser = require("body-parser");
const { auth } = require("./middleware/middleware");
require("dotenv").config();

sequelize.sync({ force: true }).then(console.log("Successful"));
const app = express();
const port = 3000;

// app.use(auth);

app.use(bodyParser.json());
// app.use((req,res,next)=>{

// })

for (const controller of controllers) {
  const { route, router } = controller;
  app.use(route, router);
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
