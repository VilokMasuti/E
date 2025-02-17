import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // Reducer for managing cart-related state and logic.
import productsReducer from './slices/productSlice'; // Reducer for managing product-related state and logic.



export const store = configureStore({

  reducer: {
    products: productsReducer, // Product slice reducer
    cart: cartReducer,         // Cart slice reducer
  },
});

/**
 * RootState
 * A TypeScript type representing the entire state object managed by the store.
 * It is derived from the store's `getState` method.
 * This is useful for providing type safety when accessing state in selectors or components.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch
 * A TypeScript type representing the dispatch function of the store.
 * It ensures type safety when dispatching actions (e.g., `store.dispatch(action)`).
 */
export type AppDispatch = typeof store.dispatch;
