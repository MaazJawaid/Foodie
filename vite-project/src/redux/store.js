import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlicer/loginSlice.js';
import adminSlice from './adminSclicer/adminSlice.js'; // assuming this is the correct path to your admin slice
import foodItemsAllSlice from './foodItemsAllSlicer/foodItemsAllSlice.js';
import tableSlice from './tableSlicer/tableSlice.js';
import cartSlicer from './cartSlicer/cartSlicer.js';
import fullCartDataSlice from './fullCartDataSlicer/fullCartDataSlice.js';


export const store = configureStore({
    reducer: {
        login: loginSlice,
        admin: adminSlice,
        food: foodItemsAllSlice,
        table: tableSlice,
        cart: cartSlicer,
        menu: fullCartDataSlice,
    },
});
