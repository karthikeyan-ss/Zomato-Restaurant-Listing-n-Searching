const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const restaurantRoutes = require('./routes/restaurantRoutes');

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://zomato-restaurant-listing-n-searching.vercel.app", // deployed frontend
];

const app = express();

connectDB();

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use('/restaurants', restaurantRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));