import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/restaurants';

export const getRestaurants = async (filters = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}`, { params: filters });
        return response.data;
    } catch (err) {
        console.error('Error fetching restaurants: ', err);
        return [];
    }
}

export const getRestaurantById = async (restaurantID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${restaurantID}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching restaurant details:', err);
        return null;
    }
}

export const searchRestaurantsByName = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, { params: { query } });
        return response.data;
    } catch (err) {
        console.error('Error searching restauarants:', err);
        return [];
    }
}

export const searchRestaurantsByLocation = async (lat, lon, radius) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search/location`, {
            params: { lat, lon, radius }
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching loaction-based restaurants: ', err);
        return [];
    }
}

export const filterRestaurants = async (country, cuisines, minCost, maxCost) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/filter`, {
            params: { country, cuisine, minCost, maxCost },
        });
        return response.data;
    } catch (err){
        console.error('Error filtering restaurants: ', err);
        return [];
    }
}

export const searchByImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post('http://localhost:5000/restaurants/search/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return response.data;
    } catch (err) {
        console.error('Error searching by image:', err);
        return [];
    }
}