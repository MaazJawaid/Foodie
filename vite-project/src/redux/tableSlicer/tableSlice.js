import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seats: [],
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    fetchSeatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSeatsSuccess(state, action) {
      state.loading = false;
      state.seats = action.payload;
    },
    fetchSeatsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSeatsStart, fetchSeatsSuccess, fetchSeatsFailure } = reservationSlice.actions;

export default reservationSlice.reducer;
