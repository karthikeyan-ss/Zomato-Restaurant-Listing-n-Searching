import React from 'react';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantsList from './pages/RestaurantsList';
import RestaurantDetails from './pages/RestaurantDetails';
import ImageSearch from './components/ImageSearch';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<RestaurantsList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/image-search" element={<ImageSearch />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
  );
}

export default App;