const express = require("express");
const sequelize = require("./database/sequelize.config");
const routes = require("./routes/index");
const cors = require("cors");

const app = express();
const PORT = 3300;

//middleware
app.use(express.json());
app.use(cors());

//Routes
app.use(routes);

//start server

const startServer = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync models with the database
    await sequelize.sync({ force: true }); // This will drop the tables if they exist and recreate them
    console.log("Models synchronized with the database.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};

startServer();
