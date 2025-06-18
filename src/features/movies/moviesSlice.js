import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=23a0dfb4e623e111fa20f927a8922a98&language=tr-TR&page=1`)
        const data = await response.json();
        return data.results.slice(0,10);
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
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = "Veri alınamadı!";
      });
  }
});

export default moviesSlice.reducer;