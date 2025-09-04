const { Op } = require("sequelize");
const Car = require("../models/Car");

exports.getAllCars = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search = '' } = req.query;
    const p = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const offset = (p - 1) * size;
    const limit = size;

    let whereClause = {};
    if (search) {
      const s = String(search).trim();
      whereClause = {
        [Op.or]: [
          { name:  { [Op.like]: `%${s}%` } },
          { model: { [Op.like]: `%${s}%` } },
          { color: { [Op.like]: `%${s}%` } },
          ...(Number.isInteger(Number(s)) ? [{ year: Number(s) }] : []),
        ]
      };
    }

    const { count, rows } = await Car.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      cars: rows,
      total: count,
      page: p,
      pageSize: limit,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

exports.createCar = async (req, res) => {
  try {
    const { name, model, year, color, price } = req.body;

    if (!name || !model) {
      return res.status(400).json({ error: 'Name and model are required' });
    }

    const car = await Car.create({
      name,
      model,
      year: year ?? null,
      color: color ?? null,
      price: price ?? null
    });

    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, model, year, color, price } = req.body;

    const car = await Car.findByPk(id);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    if (!name || !model) {
      return res.status(400).json({ error: 'Name and model are required' });
    }

    await car.update({
      name,
      model,
      year: year ?? null,
      color: color ?? null,
      price: price ?? null
    });

    res.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car' });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByPk(id);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};

exports.hello = (_req, res) => {
  res.json({ message: "Hello from Node backend!" });
};
