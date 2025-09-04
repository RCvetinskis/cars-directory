const Car = require("../models/Car");
const sequelize = require("../db");

async function car_seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ force: false });
    console.log("✅ Database synced");

    await Car.destroy({ where: {} });
    console.log("🗑️ Cleared existing cars");

    const sampleCars = [
      { name: "Tesla", model: "Model S", year: 2023, color: "Red",    price: 89990 },
      { name: "BMW",   model: "X5",      year: 2022, color: "Black",  price: 65000 },
      { name: "Audi",  model: "A4",      year: 2023, color: "White",  price: 45000 },
      { name: "Mercedes", model: "C-Class", year: 2022, color: "Silver", price: 55000 },
      { name: "Toyota",   model: "Camry",   year: 2023, color: "Blue",   price: 28000 },
      { name: "Honda",    model: "Accord",  year: 2022, color: "Gray",   price: 32000 },
      { name: "Ford",     model: "Mustang", year: 2023, color: "Yellow", price: 42000 },
      { name: "Chevrolet",model: "Camaro",  year: 2022, color: "Green",  price: 38000 },
      { name: "Nissan",   model: "Altima",  year: 2023, color: "Purple", price: 26000 },
      { name: "Hyundai",  model: "Sonata",  year: 2022, color: "Orange", price: 24000 },
      { name: "Volkswagen",model: "Passat", year: 2023, color: "Brown",  price: 29000 },
      { name: "Subaru",   model: "Legacy",  year: 2022, color: "Pink",   price: 27000 },
      { name: "Mazda",    model: "CX-5",    year: 2023, color: "Red",    price: 31000 },
      { name: "Lexus",    model: "ES",      year: 2022, color: "Black",  price: 48000 },
      { name: "Infiniti", model: "Q50",     year: 2023, color: "White",  price: 41000 }
    ];

    const createdCars = await Car.bulkCreate(sampleCars);
    console.log(`🚗 Created ${createdCars.length} sample cars`);
    console.log("✅ Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
}

car_seed();
