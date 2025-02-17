

import type React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ProductCard from './ProductCard'; 

interface FeaturedCarouselProps {
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

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Initial state for carousel index

  // Move to the next product in the carousel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Loop back to the start after the last product
  };

  // Move to the previous product in the carousel
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length // Loop back to the end after the first product
    );
  };

  return (
    <div className="relative mb-8">
      <h2 className="text-2xl mb-4 font-mono font-semibold">Featured Products</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Sliding effect
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
