import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getRestaurants,
    searchRestaurantsByName,
    filterRestaurants
} from '../services/api';
import RestaurantCard from "../components/RestaurantCard";
import LocationSearch from "../components/LocationSearch";
import ImageSearch from "../components/ImageSearch";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import { Camera } from "lucide-react";

const RestaurantsList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    //Fetch all restaurants when page changes
    useEffect(() => {
        const loadRestaurants = async () => {
            setLoading(true);
            try {
                const data = await getRestaurants({ page });
                setRestaurants(data.restaurants);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError('Failed to fetch restaurants. Try again')
            } finally {
                setLoading(false);
            }
        };
        loadRestaurants(); 
    }, [page]);

    //When clicked on a restaurant
    const handleRestaurantClick = async (restaurantID) => {
      navigate(`/restaurants/${restaurantID}`);
    }

    //Search restaurant by name
    const handleSearch = async (searchTerm) => {
        if(!searchTerm) return;
        setLoading(true);
        try {
            const data = await searchRestaurantsByName({ query: searchTerm });
            setRestaurants(data);
        } catch (err) {
            console.error('Failed to search restaurants.');
        } finally {
            setLoading(false);
        }
    }

    //Location search
    const handleLocationResults = (results) => {
      setRestaurants(results);
    }

    //Apply filters
    const handleFilterApply = async (country, cuisines, minCost, maxCost) => {
        setLoading(true);
        try {
            const data = await filterRestaurants({country, cuisines, minCost, maxCost});
            setRestaurants(data);
        } catch (err) {
            setError('Failed to filter restaurants.');
        } finally {
            setLoading(false);
        }
    }

    // Image Search
    const handleImageSearchResults = (results) => {
      setRestaurants(results);
    }

    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Restaurants</h1>

            {/* <button 
                    onClick={() => navigate('/image-search')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
            >
                <Camera className="w-5 h-5 mr-2" />
                Image Search
            </button> */}

            <ImageSearch onResults={handleImageSearchResults}/>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Search Bar - Centered Above Grid */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Sidebar (Filters + Location) & Restaurants Grid */}
          <div className="grid grid-cols-4 gap-6">
            {/* Left Sidebar - Filter & Location Search */}
            <div className="col-span-1 space-y-6">
              <FilterPanel onFilter={handleFilterApply} />
              <LocationSearch onResults={handleLocationResults} />
            </div>

            {/* Right - Restaurants Grid */}
            <div className="col-span-3">
              {/* Loading & Error Handling */}
              {loading && (
                <p className="text-center text-gray-500">
                  Loading restaurants...
                </p>
              )}
              {error && <p className="text-center text-red-500">{error}</p>}

              {/* Restaurant Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.restaurantID}
                      restaurant={restaurant}
                      onClick={() =>
                        handleRestaurantClick(restaurant.restaurantID)
                      }
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-600">
                    No restaurants found.
                  </p>
                )}
              </div>

              {/* Pagination Controls */}
              <div className="mt-6 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}

export default RestaurantsList;