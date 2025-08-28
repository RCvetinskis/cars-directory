const express = require('express');
const router = express.Router();
const { 
  hello, 
  getAllCars, 
  getCarById, 
  createCar, 
  updateCar, 
  deleteCar 
} = require('../controller/cars');

// Test route
router.get('/', hello);

// Cars routes
router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars', createCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

module.exports = router;