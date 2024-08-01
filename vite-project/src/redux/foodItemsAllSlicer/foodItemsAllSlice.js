import { createSlice } from '@reduxjs/toolkit';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFoodItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setFoodItems, setLoading, setError, clearError } = foodSlice.actions;

// Async thunk action for fetching food items
export const fetchFoodItems = () => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading to true before the API call
    const response = await fetch('http://localhost:3000/get/food/items/all');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    dispatch(setFoodItems(data)); // Dispatch action to update the store with fetched data
  } catch (error) {
    dispatch(setError(error.message)); // Dispatch action to set error message in the store
  } finally {
    dispatch(setLoading(false)); // Set loading to false after the API call completes
  }
};

export default foodSlice.reducer;
