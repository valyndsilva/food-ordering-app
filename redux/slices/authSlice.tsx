import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setIsAuthenticated: (state: any, action: any) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// export actions and reducer
export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
