const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getRestaurants);

router.get('/search/location', restaurantController.searchByLocation);

router.get('/search', restaurantController.searchRestaurants);

router.get('/filter', restaurantController.filterRestaurants);

router.get('/:id', restaurantController.getRestaurantsById);


const upload = multer({ dest: 'tempUploads/' });

router.post('/search/image', upload.single('image'), restaurantController.searchByImage);

module.exports = router;