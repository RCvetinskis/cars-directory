const Car = require("../models/Car");
const sequelize = require("../db");

async function car_seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ force: false });

    const car = await Car.create({
      name: "Tesla",
      model: "Model S",
    });

    console.log("🚗 Mock car created:", car.toJSON());
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
}

car_seed();
