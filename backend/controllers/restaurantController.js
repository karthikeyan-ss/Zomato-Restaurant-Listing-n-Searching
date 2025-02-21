const Restaurant = require('../models/Restaurant');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

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
        let { query } = req.query;

        if(!query) {
            return res.status(400).json({message: 'Query parameter is required'});
        }

        query = String(query);

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

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Setup multer for storing uploaded images
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

exports.searchByImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const filePath = path.join(uploadDir, req.file.filename);
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString("base64");

    // Structured classification prompt
    const prompt =
      "Classify the food in the image into one of the following cuisines: " +
      "[Afghani, African, American, Andhra, Arabian, Argentine, Armenian, Asian, Asian Fusion, Assamese, " +
      "Australian, Awadhi, BBQ, Bakery, Bar Food, Belgian, Bengali, Beverages, Bihari, Biryani, Brazilian, " +
      "Breakfast, British, Bubble Tea, Burger, Burmese, Cafe, Cajun, Canadian, Cantonese, Caribbean, " +
      "Chettinad, Chinese, Coffee and Tea, Continental, Cuban, Curry, Deli, Desserts, Dim Sum, Diner, " +
      "Drinks Only, European, Fast Food, Filipino, Finger Food, Fish and Chips, French, Fusion, German, " +
      "Goan, Greek, Grill, Gujarati, Hawaiian, Healthy Food, Hyderabadi, Ice Cream, Indian, Indonesian, " +
      "International, Iranian, Irish, Italian, Izgara, Japanese, Juices, Kashmiri, Kebab, Kerala, Kiwi, " +
      "Korean, Lebanese, Maharashtrian, Malaysian, Mediterranean, Mexican, Middle Eastern, Mughlai, " +
      "Nepalese, New American, North Indian, Pakistani, Parsi, Peruvian, Pizza, Portuguese, Pub Food, " +
      "Rajasthani, Ramen, Raw Meats, Salad, Sandwich, Scottish, Seafood, Singaporean, South American, " +
      "South Indian, Spanish, Sri Lankan, Steak, Street Food, Sushi, Taiwanese, Tapas, Tex-Mex, Thai, " +
      "Tibetan, Turkish, Vegetarian, Vietnamese, Western, World Cuisine].";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType: "image/png", data: base64Image } },
    ]);

    const responseText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      return res.status(500).json({ error: "Failed to analyze image" });
    }

    console.log("Gemini Response:", responseText);

    const foodLabels = extractFoodLabels(responseText);
    console.log("Extracted Food Labels:", foodLabels);

    if (foodLabels.length === 0) {
      return res.json({
        message: "No relevant food items detected.",
        restaurants: [],
      });
    }

    const matchedRestaurants = await Restaurant.find({
      cuisines: { $in: foodLabels },
    });
    res.json({ detectedItems: foodLabels, restaurants: matchedRestaurants });
  } catch (err) {
    console.error("Error processing image search:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Improved Helper function to extract food labels from Gemini's response
const extractFoodLabels = (responseText) => {
  return responseText
    .split("\n")
    .map((line) => line.replace(/\*/g, "").trim())
    .filter(
      (item) => item && !item.includes("blurry") && !item.includes("background")
    )
    .map((item) => item.split(":")[0].trim());
};
