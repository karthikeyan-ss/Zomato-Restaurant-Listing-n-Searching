import React , { useState } from "react";

const FilterPanel = ({ onFilter }) => {
    const [country, setCountry] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [minCost, setMinCost] = useState(0);
    const [maxCost, setMaxCost] = useState(5000);

    const handleApplyFilters = () => {
        onFilter({
          country,
          cuisine,
          minCost: Number(minCost),
          maxCost: Number(maxCost)
        });
    }

    return (
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        {/* Country Filter */}
        <label className="block mb-2 text-gray-700">Country</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">All</option>
          <option value="United States">United States</option>
          <option value="India">India</option>
          <option value="UK">United Kingdom</option>
        </select>

        {/* Cuisine Filter */}
        <label className="block mt-4 mb-2 text-gray-700">Cuisine</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">All</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Mexican">Mexican</option>
        </select>

        {/* Price Range Filter */}
        <label className="block mt-4 mb-2 text-gray-700">Price Range</label>
        <input
          type="range"
          min="0"
          max="5000"
          value={minCost}
          onChange={(e) => setMinCost(e.target.value)}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="5000"
          value={maxCost}
          onChange={(e) => setMaxCost(e.target.value)}
          className="w-full"
        />
        <div className="text-gray-700 text-sm">
          ₹{minCost} - ₹{maxCost}
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyFilters}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg w-full"
        >
          Apply Filters
        </button>
      </div>
    );
}

export default FilterPanel;