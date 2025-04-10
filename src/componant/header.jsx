import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contextApi/ApiContext';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { getCartItemsCount } = useCart();

  return (
    <nav className="bg-black fixed top-0 w-full z-50 rounded-b-lg text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">E-Commerce</Link>
          <div className="flex items-center space-x-4">
           
            <Link to="/products" className="hover:text-indigo-200">All Products</Link>
            <Link to="/cart" className="flex items-center hover:text-indigo-200">
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                {getCartItemsCount()}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
