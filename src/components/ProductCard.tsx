'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: {
    id: number; // Product ID (unique identifier)
    title: string; // Product title/name
    price: number; // Product price
    thumbnail: string; // Product thumbnail image URL
    description: string; // Product description
    rating: number; // Product rating (out of 5 stars)
  };
}

// Functional component for the ProductCard
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch(); // Initialize the Redux dispatch hook to dispatch actions.
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false); // State to manage the opening/closing of QuickViewModal.

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id, // Product ID
        title: product.title, // Product title
        price: product.price, // Product price
        quantity: 1, // Initial quantity is set to 1
      })
    );
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden transition-all transform hover:shadow-lg hover:-translate-y-1"
      whileHover={{ y: -5 }} // Animation: Moves the card slightly upward when hovered.
      transition={{ duration: 0.3 }} // Smooth transition for the hover effect.
    >
      <Link to={`/product/${product.id}`}>
        {' '}
        {/* Navigating to the product detail page */}
        <img
          src={product.thumbnail || '/placeholder.svg'} // Image for the product, fallback to placeholder if not provided.
          alt={product.title} // Alt text for accessibility.
          className="object-contain w-full h-48" // Tailwind CSS classes for styling (responsive image).
        />
      </Link>

      <div className="p-4 flex flex-col space-y-3">
        <Link to={`/product/${product.id}`}>
          {' '}
          {/* Product title link to detailed page */}
          <h3 className="text-lg font-semibold mb-1 truncate">
            {product.title} {/* Display the product title */}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description.slice(0, 100)}...{' '}
          {/* Display a truncated product description */}
        </p>

        <div className="flex items-center space-x-1">
          {/* Render stars based on the product's rating */}
          {[...Array(5)].map((_, index) => (
            <Star
              key={index} // Unique key for each star icon
              className={`w-4 h-4 ${
                // Styling for the star icon based on the rating
                index < Math.round(product.rating)
                  ? 'text-yellow-400' // Filled star (yellow)
                  : 'text-gray-300' // Empty star (gray)
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating.toFixed(1)}){' '}
            {/* Display rating with one decimal place */}
          </span>
        </div>

        <div className="flex gap-2 justify-between items-center">
          {/* Product price displayed in bold text */}
          <span className="text-xl font-bold text-gray-800">
            ${product.price.toFixed(2)}{' '}
            {/* Price formatted with 2 decimal places */}
          </span>

          <div className="flex space-x-2">
            {/* Quick View button */}
            <motion.button
              onClick={() => setIsQuickViewOpen(true)} // Opens the QuickViewModal when clicked
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded min-w-[100px] max-w-[120px] truncate hover:bg-gray-300 transition-colors text-sm text-center"
              whileTap={{ scale: 0.95 }} // Animation effect when button is clicked
            >
              Quick View
            </motion.button>

            {/* Add to Cart button */}
            <motion.button
              onClick={handleAddToCart} // Calls handleAddToCart when clicked
              className="bg-blue-500 text-white px-4 py-2 rounded min-w-[100px] max-w-[140px] truncate hover:bg-blue-600 transition-colors flex items-center justify-center text-sm"
              whileTap={{ scale: 0.95 }} // Animation effect on button tap
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> {/* Cart icon */}
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>

      {/* QuickViewModal component to show the product details in a modal */}
      <QuickViewModal
        product={product} // Passing the current product to the modal
        isOpen={isQuickViewOpen} // Modal open/close state
        onClose={() => setIsQuickViewOpen(false)} // Function to close the modal
      />
    </motion.div>
  );
};

export default ProductCard;
