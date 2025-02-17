'use client';

import axios from 'axios';
import { Heart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../store/slices/productSlice';

interface ProductDetailPage {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error('Product ID is missing');
        }
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`,
          {
            params: { page, limit: 10 }, // Adjust based on API pagination
          }
        );
        if (!response.data) {
          setHasMore(false); // No more products to load
        } else {
          setProduct(response.data);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 && // Trigger before reaching the bottom
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
        })
      );
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(value);
  };

  if (loading && page === 1) {
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={product.thumbnail || '/placeholder.svg'}
            alt={product.title}
            className="w-full rounded-lg shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
          <div className="grid grid-cols-5 gap-2 mt-4">
            {product.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image || '/placeholder.svg'}
                alt={`${product.title} ${index + 1}`}
                className="w-full rounded-md cursor-pointer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded-md px-2 py-1 w-16"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              aria-label="Add to Cart"
            >
              Add to Cart
            </button>
            <button
              className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Add to Favorites"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="text-center py-4">
          <LoadingSpinner />
        </div>
      )}
      {!hasMore && (
        <div className="text-center py-4">No more products to load</div>
      )}
    </div>
  );
};

export default ProductDetailPage;
