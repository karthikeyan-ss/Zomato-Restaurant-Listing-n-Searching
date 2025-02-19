const Restaurant = require('../models/Restaurant');

exports.getRestaurants = async (req, res) => {
    try {
        const { page = 1, limit = 6} = req.query;
        const restaurants = await Restaurant.find()
            .limit(limit * 1)
            .skip((page-1) * limit);
        
        const totalRestaurants = await Restaurant.countDocuments();
        res.json({
            totalPages: Math.ceil(totalRestaurants / limit),
            currentPage: page,
            restaurants,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.getRestaurantsById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            restaurantID: parseInt(req.params.id)
        });
        if(!restaurant) return res.status(404).json({
            message: 'Restaurant not found'
        });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.searchByLocation = async (req, res) => {
    try {
        const lat = parseFloat(req.query.lat);
        const lon = parseFloat(req.query.lon);
        const radius = parseFloat(req.query.radius) || 3000;

        if (isNaN(lat) || isNaN(lon)){
            return res.status(400).json({ message: 'Invalid Latitude or Longitude'});
        }

        const nearbyRestaurants = await Restaurant.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lon,lat], radius / 6378100]
                }
            }
        });

        res.json(nearbyRestaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchRestaurants = async (req, res) => {
    try {
        const { query } = req.query;

        if(!query) {
            return res.status(400).json({message: 'Query parameter is required'});
        }

        const results = await Restaurant.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { localityVerbose: { $regex: query, $options: 'i' } }
            ]
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.filterRestaurants = async (req, res) => {
    try {
        const { country, cuisines, minCost, maxCost } = req.query;
        let filter = {};

        if (country) filter.countryName = country;
        if (cuisines) filter.cuisines = { $in: cuisines.split(",") };
        if (minCost || maxCost) {
            filter.averageCostForTwo = {};
            if (minCost) filter.averageCostForTwo.$gte = parseInt(minCost);
            if (maxCost) filter.averageCostForTwo.$lte = parseInt(maxCost);
        }

        const filteredRestaurants = await Restaurant.find(filter);
        res.json(filteredRestaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}