import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Define the structure of a single cart item.
// This interface ensures type safety for each item in the shopping cart.
export interface CartItem {
  id: number;       // Unique identifier for the product.
  title: string;    // Name of the product.
  price: number;    // Price of the product.
  quantity: number; // Number of units of this product in the cart.
  thumbnail?: string; // Optional thumbnail image of the product.
}

// Define the structure of the cart state.
// The cart state contains an array of CartItem objects.
interface CartState {
  items: CartItem[]; // List of items currently in the cart.
}

// Initial state of the cart when the application starts.
// Initially, the cart is empty (no items).
const initialState: CartState = {
  items: [],
};

// Create a Redux slice for the cart feature.
// A slice in Redux Toolkit bundles state, reducers, and actions into a single module.
const cartSlice = createSlice({
  name: 'cart', // The name of this slice (used in Redux DevTools and actions).
  initialState, // The initial state of the cart.
  reducers: {
    // Reducer to handle adding an item to the cart.
    // If the item already exists, its quantity is incremented.
    // Otherwise, the item is added to the cart with an initial quantity of 1.
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id // Check if the item already exists in the cart.
      );
      if (existingItem) {
        // If the item exists, increment its quantity.
        existingItem.quantity += 1;
        // Show a success message to the user.
        toast.success(`Increased quantity of ${existingItem.title}`);
      } else {
        // If the item does not exist, add it to the cart with quantity 1.
        state.items.push({ ...action.payload, quantity: 1 });
        // Show a success message to the user.
        toast.success(`Added ${action.payload.title} to cart`);
      }
    },

    // Reducer to handle removing an item from the cart.
    // It filters out the item with the specified ID.
    removeFromCart: (state, action: PayloadAction<number>) => {
      const removedItem = state.items.find(
        (item) => item.id === action.payload // Find the item to be removed by its ID.
      );
      // Update the cart to exclude the removed item.
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (removedItem) {
     
        toast.success(`Removed ${removedItem.title} from cart`);
      }
    },

    // Reducer to handle updating the quantity of a specific item in the cart.
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id); // Find the item by its ID.
      if (item) {
        // If the item exists, update its quantity with the new value.
        item.quantity = action.payload.quantity;
        // Show a success message to the user.
        toast.success(`Updated quantity of ${item.title}`);
      }
    },
  },
});

// Export the generated actions for use in the application.
// These actions will be dispatched to update the state of the cart.
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Export the reducer to be used in the store configuration.
// The reducer is responsible for handling state updates for the cart.
export default cartSlice.reducer;
