import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "recommended",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = filtersSlice.actions;
export default filtersSlice.reducer;
