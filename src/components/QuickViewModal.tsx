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
    id: number;
    title: string;
    price: number;
    description: string;
    rating: number;
    thumbnail?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    );
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>Quick view of the product</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <img
            src={product.thumbnail || '/placeholder.svg'}
            alt={product.title}
            className="  object-contain w-full h-48 rounded-lg"
          />
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating.toFixed(1)})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            <Button onClick={handleAddToCart} className="flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
