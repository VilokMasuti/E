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
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    rating: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden transition-all transform hover:shadow-lg hover:-translate-y-1"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail || '/placeholder.svg'}
          alt={product.title}
          className="  object-contain w-full h-48"
        />
      </Link>
      <div className="p-4 flex flex-col space-y-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-1 truncate">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < Math.round(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating.toFixed(1)})
          </span>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <span className="text-xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <motion.button
              onClick={() => setIsQuickViewOpen(true)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded min-w-[100px] max-w-[120px] truncate hover:bg-gray-300 transition-colors text-sm text-center"
              whileTap={{ scale: 0.95 }}
            >
              Quick View
            </motion.button>
            <motion.button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded min-w-[100px] max-w-[140px] truncate hover:bg-blue-600 transition-colors flex items-center justify-center text-sm"
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </motion.div>
  );
};

export default ProductCard;
