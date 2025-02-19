import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    //State to toggle mobile menu
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-white shadow-md">
        {/* Navbar container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / App Name */}
            <Link to="/" className="text-2xl font-bold text-gray-800">
              🍽️ FoodFinder
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/restaurants"
                className="text-gray-600 hover:text-gray-900"
              >
                Restaurants
              </Link>
              <Link
                to="/image-search"
                className="text-gray-600 hover:text-gray-900"
              >
                Image Search
              </Link>
            </div>

            {/* Mobile Menu Button (Visible on Small Screens) */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/restaurants"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Restaurants
            </Link>
            <Link
              to="/image-search"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Image Search
            </Link>
          </div>
        )}
      </nav>
    );
}

export default Navbar;