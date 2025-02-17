

import type React from 'react';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface FlashDealsProps {
  // Define the structure of the products prop
  products: Array<{
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    rating: number;
  }>;
}

const FlashDeals: React.FC<FlashDealsProps> = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  // Set up the countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Decrease time every second
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, []);

  // Function to format the remaining time into HH:MM:SS format
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {/* Flash Deals Title and Timer */}
        <h2 className="text-2xl font-mono font-semibold">Flash Deals</h2>
        <div className="text-xl font-semibold text-red-500 font-mono bg-red-200 p-2 rounded">
          Ends in: {formatTime(timeLeft)} {/* Display formatted time */}
        </div>
      </div>
      {/* Grid for displaying products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashDeals;
