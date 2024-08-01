import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Use axios for HTTP requests

// Define async thunk to fetch cart item by ID
export const fetchCartItemById = createAsyncThunk(
    'cart/fetchCartItemById',
    async ({ email }) => {
        try {
            console.log('called')
            const response = await axios.get(`http://localhost:3000/get/all/cart/item?&email=${email}`);
            return response.data.cartItem;
        } catch (error) {
            throw error.response.data;
        }
    }
);

// Create a slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItem: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetCartState(state) {
            state.cartItem = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItemById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItem = action.payload;
                state.error = null;
            })
            .addCase(fetchCartItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions and reducer
export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
