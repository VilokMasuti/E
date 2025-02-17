import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(`Increased quantity of ${existingItem.title}`);
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success(`Added ${action.payload.title} to cart`);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const removedItem = state.items.find(
        (item) => item.id === action.payload
      );
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (removedItem) {
        toast.success(`Removed ${removedItem.title} from cart`);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        toast.success(`Updated quantity of ${item.title}`);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
