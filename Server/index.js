const express = require("express");
const sequelize = require("./database/sequelize.config");
const Capacity = require("./models/Capacity");
const Cycle = require("./models/Cycle");

const app = express();

const port = 3300;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true }); // This will drop the tables if they exist and recreate them
    console.log("Models synchronized with the database.");
    process.exit(0);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
