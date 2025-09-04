const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Car = sequelize.define(
  "Car",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  },
  {
    tableName: "cars",
    timestamps: true
  }
);

module.exports = Car;
