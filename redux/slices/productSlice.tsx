import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    productId: "",
    img: "",
    title: "",
    desc: "",
    prices: [],
    extraOptions: [],
    topping: "",
    toppingPrice: "",
    editProduct: [],
    addExtra: false,
    deleteExtra: false,
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setAddExtra: (state, action) => {
      state.addExtra = action.payload;
    },
    setDeleteExtra: (state, action) => {
      state.deleteExtra = action.payload;
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    setImg: (state, action) => {
      state.img = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setExtraOptions: (state, action) => {
      state.extraOptions = action.payload;
    },

    addProduct: (state: any, action: any) => {
      state.img = action.payload.img;
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.prices = action.payload.prices;
      state.extraOptions = action.payload.extraOptions;
    },
    editProduct: (state: any, action: any) => {
      state.img = action.payload.img;
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.prices = action.payload.prices;
      state.extraOptions = action.payload.extraOptions;
    },
    setTopping: (state, action) => {
      state.topping = action.payload;
    },
    setToppingPrice: (state, action) => {
      state.toppingPrice = action.payload;
    },
  },
});

// export actions and reducer
export const {
  setProductList,
  setProductId,
  setAddExtra,
  setDeleteExtra,
  setEditProduct,
  setImg,
  setTitle,
  setDesc,
  setPrices,
  setExtraOptions,
  addProduct,
  editProduct,
  setTopping,
  setToppingPrice,
} = productSlice.actions;
export default productSlice.reducer;
