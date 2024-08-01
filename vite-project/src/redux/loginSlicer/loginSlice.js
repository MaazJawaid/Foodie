import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
