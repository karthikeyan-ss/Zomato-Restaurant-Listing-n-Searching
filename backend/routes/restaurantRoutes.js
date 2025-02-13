const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getRestaurants);

router.get('/search/location', restaurantController.searchByLocation);

router.get('/search', restaurantController.searchRestaurants);

router.get('/filter', restaurantController.filterRestaurants);

module.exports = router;