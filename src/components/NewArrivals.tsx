import type React from 'react';
import ProductCard from './ProductCard';

interface NewArrivalsProps {
  products: Array<{
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    rating: number;
  }>;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl  mb-4 font-mono  font-semibold ">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
