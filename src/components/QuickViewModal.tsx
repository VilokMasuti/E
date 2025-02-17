import { ShoppingCart, Star } from 'lucide-react';
import type React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { addToCart } from '../store/slices/cartSlice';

interface QuickViewModalProps {

  product: {
    id: number; // Product ID (unique identifier)
    title: string; // Product title/name
    price: number; // Product price
    description: string; // Detailed description of the product
    rating: number; // Product rating (out of 5)
    thumbnail?: string; // Optional thumbnail image for the product (fallback to placeholder if not provided)
  };
  isOpen: boolean; // Boolean flag to check if the modal is open or not.
  onClose: () => void; // Callback function to close the modal when triggered.
}


const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch(); // Initialize the Redux dispatch hook.

  // Function to handle adding the product to the cart.
  const handleAddToCart = () => {
    // Dispatch the `addToCart` action to Redux store, passing product details.
    dispatch(
      addToCart({
        id: product.id, // Product ID
        title: product.title, // Product title
        price: product.price, // Product price
        quantity: 1, // Set the initial quantity of the product as 1
      })
    );
    onClose(); // Close the modal after adding to cart.
  };

  // If no product is passed, return null to render nothing.
  if (!product) return null;

  return (
    // Dialog component to create a modal with open/close control based on `isOpen`.
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* Modal Header with product title and description */}
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>Quick view of the product</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Display the product image or a placeholder if no thumbnail is provided */}
          <img
            src={product.thumbnail || '/placeholder.svg'} // Fallback to a placeholder image if no thumbnail is available.
            alt={product.title} // Alt text for accessibility.
            className="object-contain w-full h-48 rounded-lg" // 
          />
          {/* Product description */}
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="flex items-center">
            {/* Render 5 stars based on the product's rating */}
            {[...Array(5)].map((_, index) => (
              <Star
                key={index} // Unique key for each Star component
                className={`w-4 h-4 ${
                  index < Math.round(product.rating) // Compare index to rounded rating to highlight stars.
                    ? 'text-yellow-400 fill-current' // Color for filled stars.
                    : 'text-gray-300' // Color for empty stars.
                }`}
              />
            ))}
            {/* Display rating with decimal precision */}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating.toFixed(1)}) {/* Display the rating with 1 decimal precision */}
            </span>
          </div>
          {/* Product price and "Add to Cart" button */}
          <div className="flex justify-between items-center">
            {/* Display price with 2 decimal places */}
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            {/* Add to Cart button */}
            <Button onClick={handleAddToCart} className="flex items-center">
              {/* Cart icon */}
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart {/* Button text */}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
