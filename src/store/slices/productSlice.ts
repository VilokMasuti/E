import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

/**

 * Represents the structure of a product object fetched from the API.
 */
export interface Product {
  createdAt: string | number | Date; // The creation date of the product.
  images: string[];                 // An array of image URLs for the product.
  id: number;                       // A unique identifier for the product.
  title: string;                    // The name/title of the product.
  price: number;                    // Price of the product.
  description: string;              // A detailed description of the product.
  thumbnail: string;                // Thumbnail image URL of the product.
  rating: number;                   // User rating for the product.
  category: string;                 // The category the product belongs to.
  brand: string;                    // The brand of the product.
}

/**
 * ProductsState Interface
 * Represents the structure of the state for the products slice.
 */
interface ProductsState {
  items: Product[];              // Array of products fetched from the API.
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Current state of the API call.
  error: string | null;          // Error message in case the API call fails.
}

// Define the initial state for the products slice.
const initialState: ProductsState = {
  items: [],         // No products initially.
  status: 'idle',    // The API call hasn't started yet.
  error: null,       // No errors initially.
};

/**

 * Handles asynchronous fetching of products from the API using Axios.
 * The thunk automatically dispatches pending, fulfilled, and rejected actions.
 */
export const fetchProducts = createAsyncThunk<
  Product[],         // The expected return type of the API call.
  void,              // No arguments are passed to this thunk.
  { rejectValue: string } // The type of the custom error message.
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    // Make a GET request to fetch products from the dummy API.
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products as Product[]; // Return the list of products.
  } catch (error) {
    // Handle errors from the API call.
    if (axios.isAxiosError(error) && error.response) {
      // Return a custom error message if available.
      return rejectWithValue(
        error.response.data.message || 'Failed to fetch products'
      );
    } else {
      // Return a generic error message for unexpected errors.
      return rejectWithValue('An unexpected error occurred');
    }
  }
});

/**
 * Products Slice
 * Manages the state, reducers, and async logic related to products.
 */
const productsSlice = createSlice({
  name: 'products', // Name of the slice (used in Redux DevTools and actions).
  initialState,     // The initial state for this slice.
  reducers: {},     // No standard reducers for now; only async reducers are used.

  /**
   * Extra Reducers
   * Handles the state transitions for the fetchProducts async thunk.
   */
  extraReducers: (builder) => {
    // Handles the pending state of fetchProducts (API call started).
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading'; // Update the status to 'loading'.
    });

    // Handles the fulfilled state of fetchProducts (API call succeeded).
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded'; // Update the status to 'succeeded'.
        state.items = action.payload; // Populate items with the fetched products.
      }
    );

    // Handles the rejected state of fetchProducts (API call failed).
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed'; // Update the status to 'failed'.
      state.error = action.payload || 'Failed to fetch products'; // Update the error message.
    });
  },
});

// Export the reducer to be integrated into the Redux store.
// The reducer manages the state transitions for the products slice.
export default productsSlice.reducer;
