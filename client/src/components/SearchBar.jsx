import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    }

    return (
      <div className="relative w-full max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for restaurants..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg w-full"
        >
          Search
        </button>
      </div>
    );
}

export default SearchBar;