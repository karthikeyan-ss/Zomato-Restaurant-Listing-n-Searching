import React, { useState } from "react";
import { searchByImage } from "../services/api";

const ImageSearch = ({ onResults }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //File Selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    //Image upload & search
    const handleSearch = async () => {
        if (!selectedImage) {
            setError("Please select an image to search.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const results = await searchByImage(selectedImage);
            onResults(results);
        } catch (err) {
            setError('Failed to search by image. Please try again');
        } finally {
            setLoading(false);
        }
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Search by Image</h2>
        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-3 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Selected"
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Search Restaurants"}
        </button>
      </div>
    );
}

export default ImageSearch;