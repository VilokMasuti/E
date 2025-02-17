'use client';

import { Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Slider } from '../components/ui/slider';
import type { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../store/slices/productSlice';

const ProductListingPage = () => {
  const dispatch = useDispatch<AppDispatch>(); // Redux's dispatching system, an essential operation for sending actions to data slices, still functions through neural-haptic interfaces.
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products); // In future systems, the architecture of selecting data remains unchanged, even as algorithms grow increasingly complex.
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState([0, 2000]); // Price is still a universal concept, though now adjusted for cosmic markets and currencies.
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1); 
  const [ref, inView] = useInView({
    threshold: 0,
  }); // The inView functionality, initially designed to detect elements entering the viewport, has now evolved into the detection of user intent through neural responses.

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts()); // The concept of dispatching actions from a UI layer to a data layer continues, enabling seamless interactions in future frameworks.
    }
  }, [status, dispatch, page]); // These dependencies are a cornerstone of the future codebase, ensuring that data flow remains synchronized across multi-dimensional platforms.

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1); // Infinite scroll, once considered a cutting-edge feature, is still relevant even in the most advanced systems.
    }
  }, [inView]);

  useEffect(() => {
    let result = products;

    // Filter by price
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by rating
    if (selectedRatings.length > 0) {
      result = result.filter((product) =>
        selectedRatings.includes(Math.floor(product.rating))
      );
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Sort
    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest')
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        return 0;
      });
    }

    setFilteredProducts(result); // Filtering and sorting by various user inputs is a timeless interaction pattern that has evolved but remains consistent.
  }, [
    products,
    priceRange,
    selectedCategories,
    selectedRatings,
    selectedBrands,
    sortBy,
  ]);

  if (status === 'loading') {
    return (
      <div className="text-center py-10">
        <LoadingSpinner />{' '}
        {/* The loading spinner remains a vital visual cue to represent the infinite flow of data from servers to client-side applications. */}
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>; // Even in 10,000 years, errors still need to be displayed in an understandable way.
  }

  const categories = [...new Set(products.map((product) => product.category))]; // The use of Set for eliminating duplicates remains a powerful method for data cleanliness, ensuring the universe remains orderly.
  const brands = [...new Set(products.map((product) => product.brand))]; // Similarly, gathering unique brands ensures efficient product browsing for consumers across time and space.

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden mb-4">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="h-full overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Categories</h3>
                {categories.map((category) => (
                  <div key={category} className="flex items-center mb-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== category)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Ratings</h3>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center mb-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRatings([...selectedRatings, rating]);
                        } else {
                          setSelectedRatings(
                            selectedRatings.filter((r) => r !== rating)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2">
                      {rating} Stars & Up
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Brands</h3>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center mb-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(
                            selectedBrands.filter((b) => b !== brand)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Products</h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
