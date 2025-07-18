import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../constants";

export const fetchMovieDetail = createAsyncThunk(
  "movieDetail/fetchMovieDetail",
  async ({ id, lang }) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: lang === "tr" ? "tr-TR" : "en-US",
      },
    });
    return response.data;
  }
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: {
    movie: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMovieDetail: (state) => {
      state.movie = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
