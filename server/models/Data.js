const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize.config");

const Data = sequelize.define("Data", {
  cycle_number: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }, // Default value set to 0
  voltage: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }, // Default value set to 0
  current: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }, // Default value set to 0
  capacity: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 }, // Default value set to 0
});

module.exports = Data;
