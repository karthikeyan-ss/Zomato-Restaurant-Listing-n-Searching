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

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post('/search/image', upload.single('image'), restaurantController.searchByImage);

module.exports = router;