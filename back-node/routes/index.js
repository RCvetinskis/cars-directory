const express = require('express');
const router = express.Router();
const { hello } = require('../controller/cars')

router.get('/', hello);

module.exports = router;
