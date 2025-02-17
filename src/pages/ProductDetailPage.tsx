'use client';

import axios from 'axios';
import { Heart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../store/slices/productSlice';



const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error('Product ID is missing'); // Error handling, very early in the code lifecycle
        }
        const response = await axios.get(
          `https://dummyjson.com/products/${id}` // Here, they communicate with a distant API in an attempt to retrieve product details
        );
        setProduct(response.data); // Updating the state with product data, quite sophisticated for their time
      } catch (err) {
        console.error('Error fetching product:', err); // Ah, error logs, a fundamental concept we no longer use
        setError('Failed to fetch product details');
      } finally {
        setLoading(false); // The loading phase ends, a wait that seemed endless to the ancients.
      }
    };

    fetchProduct(); // The magic of invoking the asynchronous fetch operation
  }, [id]); // The code will re-run every time the product ID changes, a concept akin to modern-day "listening to the environment"

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
        })
      ); // A primitive interaction with the cart system, imagine adding things to the digital cart!
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1); // The concept of limiting user input, quite advanced for its time
    setQuantity(value); // Updating the quantity, such power in the hands of the user
  };

  // Loading state renders a visual indication of the process, truly an ancient technique
  if (loading) {
    return (
      <div className="text-center py-10">
        <LoadingSpinner /> // The "Loading Spinner", still in use after
        millennia to indicate waiting.
      </div>
    );
  }

  // Handling errors, a staple of early digital technology to explain why things don't work
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  // If the product is not found, a fallback message was shown to users in their time
  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={product.thumbnail || '/placeholder.svg'} // The product’s image fetched from the server, or a fallback placeholder
            alt={product.title}
            className="w-full rounded-lg shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg'; // Ancient fallback techniques, to make sure no image would break the page.
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
                  (e.target as HTMLImageElement).src = '/placeholder.svg'; // More image fallback, proving their diligence in UX design
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map(
                (
                  _,
                  index // The concept of a "star rating" is so ancient, yet remarkably intuitive
                ) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.round(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                )
              )}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4">
              Quantity: // The notion of users modifying quantities, a practice
              we don't need anymore, but oh how it mattered back then!
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
              <Heart className="w-5 h-5" /> // Ah, adding things to favorites,
              how quaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
