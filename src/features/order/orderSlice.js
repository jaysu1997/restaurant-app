import { createSlice } from "@reduxjs/toolkit";

const initialState = { shoppingCart: [] };

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    push: (state, action) => {
      state.shoppingCart.push(action.payload);
    },
    clear: (state) => {
      state.shoppingCart = [];
    },
  },
});

export const { push, clear } = orderSlice.actions;

export default orderSlice.reducer;
