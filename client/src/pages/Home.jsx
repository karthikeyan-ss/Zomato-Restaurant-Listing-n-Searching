import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/restaurants');
    }

    const featuredRestaurants = [
      {
        restaurantID: 17500759,
        name: "Ingleside Village Pizza",
        countryCode: 216,
        countryName: "United States",
        city: "Macon",
        address: "2395 Ingleside Ave, Macon, GA 31204",
        locality: "Macon",
        localityVerbose: "Macon, Macon",
        location: {
          type: "Point",
          coordinates: [-83.657061, 32.853896],
        },
        cuisines: ["Pizza", "Sandwich"],
        averageCostForTwo: 10,
        currency: "Dollar($)",
        hasTableBooking: false,
        hasOnlineDelivery: false,
        isDeliveringNow: false,
        switchToOrderMenu: false,
        aggregateRating: 4.9,
        ratingColor: "Dark Green",
        ratingText: "Excellent",
        votes: 478,
        image_url:
          "https://b.zmtcdn.com/data/pictures/8/2100478/dfcb7b300c0cd4916a33c3e24af2ac2a_featured_v2.jpg",
      },

      {
        restaurantID: 73088,
        name: "Chili's",
        countryCode: 1,
        countryName: "India",
        city: "Chennai",
        address:
          "49 & 50 L, Express Avenue Mall, White's Road, Royapettah, Chennai",
        locality: "Express Avenue Mall,  Royapettah",
        localityVerbose: "Express Avenue Mall,  Royapettah, Chennai",
        location: {
          type: "Point",
          coordinates: [80.264151, 13.058616],
        },
        cuisines: ["Mexican", "American", "Tex-Mex", "Burger"],
        averageCostForTwo: 1700,
        currency: "Indian Rupees(Rs.)",
        hasTableBooking: false,
        hasOnlineDelivery: false,
        isDeliveringNow: false,
        switchToOrderMenu: false,
        aggregateRating: 4.8,
        ratingColor: "Dark Green",
        ratingText: "Excellent",
        votes: 1262,
        image_url:
          "https://b.zmtcdn.com/data/pictures/2/6103902/ce9aca2a72ac59825c8aa5fbb840bc81_featured_v2.jpg",
      },
      {
        restaurantID: 17335195,
        name: "Red Ginger Sushi, Grill & Bar",
        countryCode: 216,
        countryName: "United States",
        city: "Davenport",
        address: "793 Middle Rd, Bettendorf, IA 52722",
        locality: "Bettendorf",
        localityVerbose: "Bettendorf, Davenport",
        location: {
          type: "Point",
          coordinates: [-90.522479, 41.53845],
        },
        cuisines: ["Sushi", "Teriyaki"],
        averageCostForTwo: 40,
        currency: "Dollar($)",
        hasTableBooking: false,
        hasOnlineDelivery: false,
        isDeliveringNow: false,
        switchToOrderMenu: false,
        aggregateRating: 4.5,
        ratingColor: "Dark Green",
        ratingText: "Excellent",
        votes: 208,
        image_url:
          "https://b.zmtcdn.com/data/pictures/8/18424018/298e360668cf089f853bde84368384f1_featured_v2.jpg",
      },
    ];

    return (
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
          style={{ backgroundImage: "url('/images/restaurant-hero2.jpg')" }}
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              Discover the Best Restaurants
            </h1>
            <p className="text-lg mt-2">Find top-rated restaurants near you</p>

            {/* Search Bar */}
            <div className="mt-6 relative w-full max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for restaurants..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Explore Button */}
            <button
              onClick={handleSearch}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Featured Restaurants */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Top Rated Restaurants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.restaurantID}
                restaurant={restaurant}
              />
            ))}
          </div>
        </div>

        {/* Popular Cuisines */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore by Cuisine
          </h2>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Indian</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">
              Chinese
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">
              Italian
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">
              Mexican
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">
              Japanese
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white text-center py-12 mt-12">
          <h2 className="text-3xl font-bold">Ready to explore more?</h2>
          <p className="text-lg mt-2">
            Find and book your favorite restaurants now.
          </p>
          <button
            onClick={handleSearch}
            className="mt-4 bg-white text-blue-600 font-bold py-2 px-6 rounded-lg"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
}

export default Home;