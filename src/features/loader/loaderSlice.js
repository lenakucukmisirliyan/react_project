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
    loaderPasive: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loaderActive, loaderPasive } = loaderSlice.actions;
export default loaderSlice.reducer;
