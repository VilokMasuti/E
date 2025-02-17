import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define interfaces for the product and the slice state
export interface Product {
  createdAt: string | number | Date;
  images: string[];
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  rating: number;
  category: string;
  brand: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products as Product[]; // Ensure type safety here
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || 'Failed to fetch products'
      );
    } else {
      return rejectWithValue('An unexpected error occurred');
    }
  }
});

// Create the slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload; // Update items with the fetched products
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Failed to fetch products';
    });
  },
});

// Export the reducer to use in your store
export default productsSlice.reducer;
