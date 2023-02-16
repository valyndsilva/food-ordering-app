import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import modalReducer from "./slices/modalSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    modal: modalReducer,
  },
});
