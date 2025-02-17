import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productSlice';
export const store = configureStore({
  reducer: { products: productsReducer, cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// To use this store in your application, you need to set it up in your main application
