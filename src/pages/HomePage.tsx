'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryNavigation from '../components/CategoryNavigation';
import FeaturedCarousel from '../components/FeaturedCarousel';
import FlashDeals from '../components/FlashDeals';
import NewArrivals from '../components/NewArrivals';
import { Button } from '../components/ui/button';
import type { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../store/slices/productSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-10"><LoadingSpinner/></div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  const featuredProducts = products.slice(0, 5);
  const newArrivals = products.slice(5, 9);
  const flashDeals = products.slice(9, 13);

  return (
    <div className="container mx-auto px-4 py-8">
      <FeaturedCarousel products={featuredProducts} />
      <CategoryNavigation />
      <NewArrivals products={newArrivals} />
      <FlashDeals products={flashDeals} />
      <div>
        <Link to="/products">
          <Button variant="outline">More Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
