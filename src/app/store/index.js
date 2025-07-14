import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../features/movies/moviesSlice';
import loaderReducer from '../../features/loader/loaderSlice';
import contactReducer from '../../features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    loader: loaderReducer,
    contact: contactReducer,
  },
});

