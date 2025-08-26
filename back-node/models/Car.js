const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Car = sequelize.define(
  "Car",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "cars",
    timestamps: true,
  }
);

module.exports = Car;
