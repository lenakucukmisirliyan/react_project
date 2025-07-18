import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api";
import { API_KEY } from "../../constants";

const initialState = {
  moviesData: [],
  searchTerm: "",
  cacheByPage: {},
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const getMoviesThunk = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page, language, query }, { getState, rejectWithValue }) => {
    const { movies } = getState();
    const cachedLang = movies.cacheByPage[language];
    const cachedResults = cachedLang?.[page];
    const isSearching = !!query?.trim();

    // SORUN MUHTEMELEN BURADA
    if (!isSearching && cachedResults) {
      return {
        page,
        results: cachedResults,
        total_pages: movies.totalPages,
        fromCache: true,
      };
    }

    try {
      const url = isSearching
        ? "https://api.themoviedb.org/3/search/movie"
        : "https://api.themoviedb.org/3/movie/popular";

      const response = await axiosInstance.get(url, {
        params: {
          api_key: API_KEY,
          language,
          page,
          ...(isSearching && { query }),
        },
      });

      return {
        page,
        results: response.data.results,
        total_pages: response.data.total_pages,
        fromCache: false,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMoviesThunk.fulfilled, (state, action) => {
        const { page, results, total_pages, fromCache } = action.payload;
        const currentLang = action.meta.arg.language;

        state.isLoading = false;
        state.moviesData = results;
        state.error = null;

        if (!fromCache) {
          if (!state.cacheByPage[currentLang]) {
            state.cacheByPage[currentLang] = {};
          }
          state.cacheByPage[currentLang][page] = results;
        }

        if (!fromCache && total_pages) {
          const frontendPageSize = 10;
          const apiPageSize = 20;
          const maxApiPages = 500;
          const safeTotalPages = Math.min(total_pages, maxApiPages);
          const calculatedTotalPages = Math.ceil(
            (safeTotalPages * apiPageSize) / frontendPageSize
          );
          state.totalPages = calculatedTotalPages;
        }
      })
      .addCase(getMoviesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm } = moviesSlice.actions;
export default moviesSlice.reducer;
