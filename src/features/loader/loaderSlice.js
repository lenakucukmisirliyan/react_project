import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    loaderActive: (state) => {
      state.isLoading = true;
    },
    loaderPassive: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loaderActive, loaderPassive } = loaderSlice.actions;
export default loaderSlice.reducer;
