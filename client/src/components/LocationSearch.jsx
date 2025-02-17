import React, { useState } from "react";
import { searchRestaurantsByLocation } from "../services/api";
import { MapPin, Target, Crosshair } from "lucide-react";

const LocationSearch = ({ onResults }) => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [radius, setRadius] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toFixed(6));
        setLon(position.coords.longitude.toFixed(6));
        setError(""); // Clear any previous errors
      },
      (err) => {
        setError("Unable to retrieve location. Allow location access.");
      }
    );
  };

  // Function to search restaurants
  const handleSearch = async () => {
    if (!lat || !lon) {
      setError("Please enter valid coordinates.");
      return;
    }
    setLoading(true);
    try {
      const data = await searchRestaurantsByLocation(lat, lon, radius);
      onResults(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch restaurants. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <MapPin className="w-5 h-5 text-blue-500 mr-2" />
        Search by Location
      </h2>

      {/* Latitude */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Latitude
        </label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Enter latitude"
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Longitude */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Longitude
        </label>
        <input
          type="number"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Enter longitude"
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Use Current Location Button */}
      <button
        onClick={getCurrentLocation}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md font-medium flex items-center justify-center mb-3"
      >
        <Crosshair className="w-5 h-5 mr-2" />
        Use Current Location
      </button>

      {/* Radius */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Search Radius (meters)
        </label>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium flex items-center justify-center"
      >
        <Target className="w-5 h-5 mr-2" />
        {loading ? "Searching..." : "Find Restaurants"}
      </button>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LocationSearch;
