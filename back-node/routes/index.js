const express = require('express');
const router = express.Router();

const {
  hello,
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} = require('../components/CarList');

router.get('/', hello);

router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars', createCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

module.exports = router;
