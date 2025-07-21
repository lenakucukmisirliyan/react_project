import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../features/movies/moviesSlice';
import loaderReducer from '../../features/loader/loaderSlice';
import contactReducer from '../../features/contact/contactSlice';
import movieDetailReducer from "../../features/movieDetail/movieDetailSlice";

const reducer = {
  movies: moviesReducer,
  loader: loaderReducer,
  contact: contactReducer,
  movieDetail: movieDetailReducer,
};

export const store = configureStore({
  reducer,
});
