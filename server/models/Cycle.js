const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize.config");

const Cycle = sequelize.define("Cycle", {
  cycle_number: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.FLOAT, allowNull: false },
  current: { type: DataTypes.FLOAT, allowNull: false },
  voltage: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Cycle;
