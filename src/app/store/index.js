import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../features/movies/moviesSlice';
import loaderReducer from "../../features/loader/loaderSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    loader: loaderReducer,
  },
});

