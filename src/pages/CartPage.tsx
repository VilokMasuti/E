'use client';

// Import necessary libraries and components
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import type { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

// Define the schema for the checkout form using Zod
const checkoutSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters' }),
});

const CartPage = () => {
  // Retrieve cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Initialize the form using react-hook-form and Zod
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      name: '',
      address: '',
    },
  });

  // Function to remove an item from the cart
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Function to update the quantity of an item in the cart
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to handle form submission
  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    // Log the order details (you would typically send this to a backend)
    console.log('Order submitted:', {
      ...values,
      items: cartItems,
      total: totalPrice,
    });
    // Reset the form after submission
    form.reset();
    // Optionally, clear the cart here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl mb-8 font-mono font-semibold">Your Cart</h1>
      {cartItems.length === 0 ? (
        // Display a message if the cart is empty
        <p className="text-center font-semibold font-mono text-gray-500">
          Your cart is empty
        </p>
      ) : (
        // Display the cart items and order summary
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                {/* Display the product image */}
                <img
                  src={item.thumbnail || ''} // Fallback to a placeholder if the image is missing
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                  onError={(e) => {
                    // Fallback to a placeholder if the image fails to load
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    {/* Decrease quantity button */}
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="border rounded-l-md px-2 py-1"
                    >
                      -
                    </button>
                    {/* Quantity input */}
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          item.id,
                          Number.parseInt(e.target.value)
                        )
                      }
                      className="border-t border-b px-2 py-1 w-16 text-center"
                    />
                    {/* Increase quantity button */}
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="border rounded-r-md px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Remove item button */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          {/* Order summary section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-100 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {/* Checkout button */}
              <Button
                className="w-full mt-6"
                onClick={() => setIsCheckingOut(true)}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Checkout modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Address field */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St, City, Country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Cancel and submit buttons */}
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCheckingOut(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Place Order</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
