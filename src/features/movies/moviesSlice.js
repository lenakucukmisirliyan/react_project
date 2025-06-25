import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../../constants/constant';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (lang) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`,
      {
        params: {
          api_key: API_KEY,
          language: lang,
          page: 1
        }
      });

    return response.data.results;
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Veri alınamadı!";
      });
  }
});

export default moviesSlice.reducer;