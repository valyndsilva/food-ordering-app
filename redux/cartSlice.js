import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartQuantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.cartQuantity += 1;
      state.total += action.payload.price * action.payload.qty;
    },
    reset: (state) => {
      // state = initialState;
      state.products = [];
      state.cartQuantity = 0;
      state.total = 0;
    },
  },
});

// export actions and reducer
export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
