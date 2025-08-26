require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "cars-directory-cars-directory.d.aivencloud.com",
    dialect: "mysql",
    port: 15402,
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to aiven MySQL via Sequelize"))
  .catch((err) => console.error("Sequelize connection error:", err));

module.exports = sequelize;
