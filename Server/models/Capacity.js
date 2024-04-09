const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize.config");

const Capacity = sequelize.define("Capacity", {
  cycle_number: { type: DataTypes.INTEGER, allowNull: false },
  capacity: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Capacity;
