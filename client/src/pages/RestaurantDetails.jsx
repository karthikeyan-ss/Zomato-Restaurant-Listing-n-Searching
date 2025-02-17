import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/api";
import { MapPin, Star, DollarSign, Clock, Utensils } from "lucide-react";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const data = await getRestaurantById(id);
        if (!data) throw new Error("Restaurant not found");
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10">
        Loading restaurant details...
      </p>
    );
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Image Section */}
      <div className="h-72 md:h-96 bg-gray-300 relative">
        <img
          src={restaurant.image_url || "/default-restaurant.jpg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Restaurant Details Container */}
      <div className="max-w-6xl mx-auto p-6 -mt-12 relative bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
        <p className="text-gray-600 mt-1">{restaurant.localityVerbose}</p>

        {/* Rating and Votes */}
        <div className="flex items-center mt-3">
          <span className="bg-green-600 text-white px-3 py-1 rounded text-lg font-medium">
            {restaurant.aggregateRating} ⭐
          </span>
          <span className="ml-3 text-gray-600">
            {restaurant.ratingText} ({restaurant.votes} votes)
          </span>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div className="ml-3">
                <p className="text-gray-800 font-semibold">
                  {restaurant.address}
                </p>
                <p className="text-gray-600">
                  {restaurant.locality}, {restaurant.city}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Utensils className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800 font-semibold">
                {restaurant.cuisines.join(", ")}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800 font-semibold">
                {restaurant.averageCostForTwo} {restaurant.currency}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800 font-semibold">
                {restaurant.hasOnlineDelivery
                  ? "Online Delivery Available"
                  : "No Online Delivery"}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Badges */}
        <div className="flex gap-2 mt-4">
          {restaurant.hasTableBooking && (
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              Table Booking Available
            </span>
          )}
          {restaurant.hasOnlineDelivery && (
            <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Online Delivery
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
