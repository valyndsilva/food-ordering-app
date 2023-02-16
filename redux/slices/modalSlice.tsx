import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    addModal: false,
    editModal: false,
  },
  reducers: {
    setAddModal: (state: any, action: any) => {
      state.addModal = action.payload;
    },
    setEditModal: (state: any, action: any) => {
      state.editModal = action.payload;
    },
  },
});

// export actions and reducer
export const { setAddModal, setEditModal } = modalSlice.actions;
export default modalSlice.reducer;
