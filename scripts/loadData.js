const mongoose = require('mongoose');
const Restaurant = require('../backend/models/Restaurant');
require('dotenv').config({ path: '../backend/.env' });
const fs = require('fs');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('DB Connection Error: ', err));

const data = JSON.parse(fs.readFileSync('../data/final_zomato.json', 'utf-8'));

async function loadData() {
    try {
        const transformedData = data.map(restaurant => ({
           restaurantID: restaurant['Restautrant ID'],
           name: restaurant['Restaurant Name'],
           countryCode: restaurant['Country Code'],
           countryName: restaurant['Country Name'],
           city: restaurant['City'],
           address: restaurant['Address'],
           locality: restaurant['Locality'],
           localityVerbose: restaurant['Locality Verbose'],
           location: {
                latitude: restaurant['Latitude'],
                longitude: restaurant['Longitude']
           },
           cuisines: restaurant['Cuisines'] ? restaurant['Cuisines'].split(',').map(c => c.trim()) : [],
           averageCostForTwo: restaurant['Average Cost for two'],
           currency: restaurant['Currency'],
           hasTableBooking: restaurant['Has Online Booking'] === 'Yes',
           hasOnlineDelivery: restaurant['Has Online Delivery'] === 'Yes',
           isDeliveringNow: restaurant['Is delivering now'] === 'Yes',
           switchToOrderMenu: restaurant['Switch to order menu'] === 'Yes',
           priceRange: restaurant['Price Range'],
           aggreagateRating: restaurant['Aggregate rating'],
           ratingColor: restaurant['Rating color'],
           ratingText: restaurant['Rating text'],
           votes: restaurant['Votes'],
           image_url: restaurant['image_url'] || null
        }));

        await Restaurant.deleteMany();
        await Restaurant.insertMany(transformedData);
        console.log("Data Imported Successfully");
        process.exit();
    } catch (err) {
        console.error('Error Importing Data: ', err);
        process.exit(1);
    }
}

loadData();