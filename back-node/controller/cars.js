const Car = require("../models/Car");

// Get all cars with pagination and search
exports.getAllCars = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search = '' } = req.query;
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const whereClause = search ? {
      [require('sequelize').Op.or]: [
        { name: { [require('sequelize').Op.like]: `%${search}%` } },
        { model: { [require('sequelize').Op.like]: `%${search}%` } }
      ]
    } : {};

    const { count, rows } = await Car.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      cars: rows,
      total: count,
      page: parseInt(page),
      pageSize: limit,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

// Get single car by ID
exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

// Create new car
exports.createCar = async (req, res) => {
  try {
    const { name, model, year, color, price } = req.body;
    
    // Validation
    if (!name || !model) {
      return res.status(400).json({ error: 'Name and model are required' });
    }
    
    const car = await Car.create({
      name,
      model,
      year: year || null,
      color: color || null,
      price: price || null
    });
    
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
};

// Update car
exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, model, year, color, price } = req.body;
    
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    // Validation
    if (!name || !model) {
      return res.status(400).json({ error: 'Name and model are required' });
    }
    
    await car.update({
      name,
      model,
      year: year || null,
      color: color || null,
      price: price || null
    });
    
    res.json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car' });
  }
};

// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};

// Hello endpoint for testing
exports.hello = (req, res) => {
  res.json({ message: "Hello from Node backend!" });
};