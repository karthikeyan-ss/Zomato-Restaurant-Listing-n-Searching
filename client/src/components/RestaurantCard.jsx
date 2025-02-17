import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, DollarSign } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  // Convert rating color to Tailwind classes
  const getRatingColorClass = (color) => {
    const colorMap = {
      "dark green": "bg-green-600",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
    };
    return colorMap[color.toLowerCase()] || "bg-gray-500";
  };

  const handleCardClick = () => {
    navigate(`/restaurants/${restaurant.restaurantID}`);
  }

  return (
    <div
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        {/* Image */}
        <img
          src={restaurant.image_url || "https://via.placeholder.com/400x250"}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          {/* Name & Price */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <span className="text-sm font-medium flex items-center">
              <DollarSign className="w-4 h-4 inline mr-1" />
              {restaurant.averageCostForTwo} {restaurant.currency}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {restaurant.locality}, {restaurant.city}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <span
              className={`${getRatingColorClass(
                restaurant.ratingColor
              )} text-white px-2 py-1 rounded text-sm font-medium`}
            >
              {restaurant.aggregateRating}
            </span>
            <span className="text-sm text-gray-600 ml-2">
              {restaurant.ratingText} ({restaurant.votes} votes)
            </span>
          </div>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-1 mb-2">
            {restaurant.cuisines.map((cuisine, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full"
              >
                {cuisine}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="flex gap-2 mt-3">
            {restaurant.hasTableBooking && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                Table Booking
              </span>
            )}
            {restaurant.hasOnlineDelivery && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                Online Delivery
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
