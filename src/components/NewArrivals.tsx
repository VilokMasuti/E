import type React from 'react';
import ProductCard from './ProductCard'; 

interface NewArrivalsProps {
  // Define the structure of the products prop.
  products: Array<{
    id: number; // Unique identifier for each product
    title: string; // Title of the product
    price: number; // Price of the product
    thumbnail: string; // Image URL for the product thumbnail
    description: string; // Short description of the product
    rating: number; // Product rating (out of 5 stars)
  }>;
}

// Functional component for NewArrivals
const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <div className="mb-8">
      {/* Section title */}
      <h2 className="text-2xl mb-4 font-mono font-semibold">New Arrivals</h2>
      {/* Grid layout to display products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Map over the products array and render ProductCard for each product */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> // Passing each product as a prop to ProductCard
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
