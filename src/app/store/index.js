import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../features/movies/moviesSlice';
import loaderReducer from '../../features/loader/loaderSlice';
import contactReducer from '../../features/contact/contactSlice';
import movieDetailReducer from "../../features/movieDetail/movieDetailSlice";
import booksReducer from "../../features/books/booksSlice";
import filtersReducer from "../../features/books/filtersSlice";

const reducer = {
  movies: moviesReducer,
  books: booksReducer,
  loader: loaderReducer,
  contact: contactReducer,
  movieDetail: movieDetailReducer,
  filters: filtersReducer,
};

export const store = configureStore({
  reducer,
});
