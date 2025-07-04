import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  moviesData: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesDataAction: (state, action) => {
      state.moviesData = action.payload;
    },
  },
});

export const { setMoviesDataAction } = moviesSlice.actions;

export default moviesSlice.reducer;
