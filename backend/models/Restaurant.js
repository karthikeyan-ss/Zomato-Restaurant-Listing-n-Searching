const mongoose =  require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantID: Number,
    name: String,
    countryCode: Number,
    countryName: String,
    city: String,
    address: String,
    locality: String,
    localityVerbose: String,
    location: {
        type: { type: String, default: 'Point'},
        coordinates: { type: [Number], required: true}
    },
    cuisines: [String],
    averageCostForTwo: Number,
    currency: String,
    hasTableBooking: Boolean,
    hasOnlineDelivery: Boolean,
    isDeliveringNow: Boolean,
    switchToOrderMenu: Boolean,
    priceRange: Number,
    aggregateRating: Number,
    ratingColor: String,
    ratingText: String,
    votes: Number,
    image_url: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);