import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  adminToken: null,
  adminUser: null,
  isAdminAuthenticated: false,
  adminLoading: false,
  adminError: null,
};

// Create a slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLoginSuccess(state, action) {
      state.adminLoading = false;
      state.isAdminAuthenticated = true;
      state.adminUser = action.payload.admin;
    },
    adminLoginFailure(state, action) {
      state.adminLoading = false;
      state.adminError = action.payload;
    },
    adminLogout(state) {
      state.isAdminAuthenticated = false;
      state.adminToken = null;
      state.adminUser = null;
    },
  },
});

// Export actions and reducer
export const { adminLoginSuccess, adminLoginFailure, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
