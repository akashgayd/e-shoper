import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contextApi/ApiContext';
import { CiShoppingCart } from "react-icons/ci";

const ProductItem = ({ product }) => {
  const { NewAddCard } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    NewAddCard(product);
  };

  
  const discountPercentage = product.discountPercentage || 0; // Handle cases where discountPercentage is missing
  const discountedPrice = product.price * (1 - discountPercentage / 100);

  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 h-full flex flex-col">
      
        {discountPercentage > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-full z-10">
            {discountPercentage.toFixed(0)}% OFF
          </div>
        )}

      
        <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 xl:h-72 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.brand}</span>
            </div>

            <h3 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              {discountPercentage > 0 && (
                <span className="text-sm line-through text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-3 w-full bg-red-400 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
              aria-label={`Add ${product.title} to cart`}
            >
              <CiShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
