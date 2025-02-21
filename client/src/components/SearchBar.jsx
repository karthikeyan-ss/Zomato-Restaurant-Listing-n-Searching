import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex items-center w-full max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <div className="p-2">
        <Search className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search for restaurants..."
        className="flex-grow p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
