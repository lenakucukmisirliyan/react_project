import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async ( { query, lang }, thunkAPI) => {
        const response = await axios.get (
            `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}`
        );
        return response.data.items;
    }
)

const booksSlice = createSlice ({
    name: "books",
    initialState: {
        books: [],
        status: "idle",  // Henüz hiçbir istek yapılmadı anlamında
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default booksSlice.reducer;