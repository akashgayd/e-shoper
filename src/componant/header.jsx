import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contextApi/ApiContext';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { IncressQuantity } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black fixed top-0 w-full z-50 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">E-Commerce</Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-300 transition-colors">
              All Products
            </Link>
            <Link
              to="/cart"
              className="flex items-center hover:text-indigo-300 transition-colors"
              aria-label="View Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {IncressQuantity() > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                  {IncressQuantity()}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-700">
            <div className="flex flex-col space-y-3 mt-3">
              <Link 
                to="/" 
                className="hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/cart"
                className="flex items-center hover:bg-gray-800 px-3 py-2 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="View Cart"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>Cart</span>
                {IncressQuantity() > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                    {IncressQuantity()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;