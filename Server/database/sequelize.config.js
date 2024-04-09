const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize("cell_test_data", "root", "", {
  host: "localhost",
  dialect: "mysql", // Choose your database dialect
});

module.exports = sequelize;
