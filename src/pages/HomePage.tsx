
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryNavigation from '../components/CategoryNavigation';
import FeaturedCarousel from '../components/FeaturedCarousel';
import FlashDeals from '../components/FlashDeals';
import LoadingSpinner from '../components/LoadingSpinner';
import NewArrivals from '../components/NewArrivals';
import { Button } from '../components/ui/button';
import type { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../store/slices/productSlice';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products);

  // Fetch products when the component mounts or when status is 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Display loading spinner while products are being fetched
  if (status === 'loading') {
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  // Display error message if fetching products failed
  if (status === 'failed') {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  // Slice products for different sections
  const featuredProducts = products.slice(0, 5);
  const newArrivals = products.slice(5, 9);
  const flashDeals = products.slice(9, 13);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Carousel */}
      <FeaturedCarousel products={featuredProducts} />
      {/* Category Navigation */}
      <CategoryNavigation />
      {/* New Arrivals Section */}
      <NewArrivals products={newArrivals} />
      {/* Flash Deals Section */}
      <FlashDeals products={flashDeals} />
      {/* Link to More Products */}
      <div>
        <Link to="/products">
          <Button variant="outline">More Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
