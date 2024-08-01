import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    setImageUrls_1: {},
    setCategoryBasedItems_1: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setImageUrls_1: (state, action) => {
            state.setImageUrls_1 = action.payload;
        },
        setCategoryBasedItems_1: (state, action) => {
            state.setCategoryBasedItems_1 = action.payload;
        },
    },
});

export const { setImageUrls_1, setCategoryBasedItems_1 } = menuSlice.actions;
export default menuSlice.reducer;
